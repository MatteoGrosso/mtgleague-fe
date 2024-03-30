let timer;

export default {
  async login(context, payload) {
    console.log('login...');
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },
  async signup(context, payload) {
    console.log('signup...');
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url = `http://localhost:8080/auth/` + mode;
    let body= {}
    if (mode ==='signup' ){
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

    const expiresIn = +responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.token);
    localStorage.setItem('userId', responseData.userId);
    localStorage.setItem('tokenExpiration', expirationDate);

    console.log('èèèèèèèèèèèèèèèèèèèèèè')
      console.log(responseData)

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (mode === 'signup') {
      const newPlayer = {
        name: payload.name,
        surname: payload.surname,
        email: payload.email,
        password: payload.password,
      };

      context.dispatch('players/addPlayer', newPlayer);
    }


    context.commit('setUser', {
      token: responseData.token,
      userId: responseData.userId,
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    //TODO richiedere a backend il set di ruoli, così da fare il set locale
    //andare a backend tramite userId token (solo se expiresIn è > di qualcosa) a fare select dei ruoli
    //se il token è valido prendo i ruoli
    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
        //userRoles: userRoles
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
    context.dispatch('logout');
    context.commit('setAutoLogout');
  },
};
