<template>
  <nav class="navbar">
    <div class="logo">
      <img src="@/assets/logo.svg" alt="logo vue" width="50" />
      <div class="brand">Todo list app</div>
    </div>
    <div class="links">
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/Abaut">Abaut</RouterLink></li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  background-color: var(--navbar-color);
  padding: 20px;
  margin-bottom: 30px;
  justify-content: space-between;
}
.brand {
  font-size: 2rem;
}
.logo{
  display: flex;
  align-items: center;
}
.links ul{
  display: flex;
  align-items: center;
  padding: 20px;
  list-style: none;
}
.links a{
  font-size: 30px;
  text-decoration: none;
  padding-left: 10px;
  color: var(--text-color);
}
a.router-link-active{
  color: var(--accent-color);
}
</style>
