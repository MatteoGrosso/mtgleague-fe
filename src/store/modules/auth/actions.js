import { endpoint } from '../../index.js';

let timer;

export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url = endpoint + `/auth/` + mode;
    let body= {}
    if (mode ==='signup'){
      body= {
        name: payload.name,
        surname: payload.lastName,
        email: payload.email,
        password: payload.password,
      }
    }else {
      body= {
        email: payload.email,
        password: payload.password,
      }
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to authenticate');
      throw error;
    }

    const expiresIn = +responseData.expiresIn;
    const expirationDate = new Date().getTime() + expiresIn;

    try {
      localStorage.setItem('token', responseData.token);
      localStorage.setItem('userId', responseData.userId);
      localStorage.setItem('tokenExpiration', expirationDate);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
    
    timer= setTimeout(()=> {
      context.dispatch('autoLogout')
    }, expiresIn)

    context.commit('setUser', {
      token: responseData.token,
      userId: responseData.userId,
      role: responseData.role
    });
  },
  async tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const expiresIn = +tokenExpiration - new Date().getTime();

    let url = endpoint + `/auth/login`;

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    const body = {
      playerId: userId
    };

    const response = await fetch(url, {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to authenticate');
      throw error;
    }
    
    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
        role: responseData.role
      });
    }
  },
  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      userRoles: [],
    });
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);
  },
  autoLogout(context) {
    console.log('token expired, autologout...')
    context.dispatch('logout');
    context.commit('setAutoLogout');
  },
};
