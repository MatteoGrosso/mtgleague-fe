<template>
  <header>
    <nav>
      <h1>
        <router-link to="/">LP Canavese</router-link>
      </h1>
      <ul>
        <li>
          <router-link to="/counter">Segnapunti</router-link>
        </li>
        <li>
          <router-link to="/current">Partita in corso</router-link>
        </li>
        <li>
          <router-link to="/events">Eventi</router-link>
        </li>
        <li>
          <router-link to="/players">Classifica</router-link>
        </li>
        <li>
          <router-link to="/auth">Login</router-link>
        </li>
        <li>
          <base-button>Logout</base-button>
        </li>
      </ul>
    </nav>
  </header>
  <nav class="mobile-nav">
        <ul class="mobile-nav__items">
            <li class="mobile-nav__item">
                <a href="packages/index.html">Packages</a>
            </li>
            <li class="mobile-nav__item">
                <a href="customers/index.html">Customers</a>
            </li>
            <li class="mobile-nav__item mobile-nav__item--cta">
                <a href="start-hosting/index.html">Start Hosting</a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
};
</script>

<style scoped>
header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #3d008d;
  padding: 0.5rem 1rem;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}

.mobile-nav {
  position: fixed;
  transform: translateX(-100%);
  transition: transform 0.3s ease-out;
  z-index: 101;
  top: 0;
  left: 0;
  background: white;
  width: 80%;
  height: 100vh;
}

.mobile-nav__items {
  width: 90%;
  height: 100%;
  list-style: none;
  margin: 0% auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}

.mobile-nav__item {
  margin: 1rem 0;
}

.mobile-nav__item a {
  font-size: 1.5rem;
}

</style>
