<template>
    <nav class="navbar">
    <img src="@/assets/logo.svg" alt="logo vue" width="50" />
    <div class="brand">Todo list app</div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  background-color: var(--navbar-color);
  padding: 20px;
  margin-bottom: 30px;
}
.brand {
  font-size: 2rem;
}
</style>