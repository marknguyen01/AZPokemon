<template>
  <v-card
    color="red lighten-2"
    dark
  >
    <v-card-text>
      <v-autocomplete
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        @change="change"
        color="white"
        hide-no-data
        hide-selected
        item-text="newName"
        item-value="name"
        label="Pokemon Search"
        placeholder="Start typing to Search"
        prepend-icon="mdi-database-search"
        return-object
      ></v-autocomplete>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      entries: [],
      isLoading: false,
      model: null,
      search: null,
    }),
    computed: {
      items () {
        return this.entries.map(entry => {
          const newName = entry.name.replace(/-/g, ' ').replace(/(\w)(\w*)/g, (g0,g1,g2) => {
            return g1.toUpperCase() + g2.toLowerCase()
          });
          return Object.assign({}, entry, { newName })
        })
      },
    },

    watch: {
      search (val) {
        // Items have already been loaded
        if (this.items.length > 0) return

        // Items have already been requested
        if (this.isLoading) return

        this.isLoading = true

        // Lazily load input items
        fetch('/api/pokemon/search/' + val.toLowerCase())
          .then(res => res.json())
          .then(res => {
            this.entries = res
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
      },
    },

    methods: {
      change() {
        window.location.href = "/pokemon/" + this.model.name
      }
    }
  }
</script>