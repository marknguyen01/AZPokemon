<template>
  <div class="body">
    <div class="container">
      <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
        </a>

        <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" class="nav-link px-2 link-secondary">Home</a></li>
          <li><a href="#" class="nav-link px-2 link-dark">PokeDex</a></li>
          <li><a href="#" class="nav-link px-2 link-dark">Regions</a></li>
          <li><a href="#" class="nav-link px-2 link-dark">Items</a></li>
        </ul>

        <div class="col-md-3 text-end">
          <button type="button" class="btn btn-outline-primary me-2">Login</button>
          <button type="button" class="btn btn-primary">Sign-up</button>
        </div>
      </header>
      <div class="search-form">
        <div class="input-group">
          <input type="text" class="form-control w-50" aria-label="Text input with segmented dropdown button">
          <select class="form-select" id="inputGroupSelect01">
            <option selected>Pokemon</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <button type="button" class="btn btn-outline-secondary">
            <i class="bi bi-search"></i>
            <span class="d-inline-xl">Search </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
body {
}
</style>
