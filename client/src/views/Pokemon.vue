<template>
    <div>
        <v-avatar color="blue" size="475">
            <img :src="this.result.sprites.other['official-artwork']['front_default']" :alt="this.result.name">
        </v-avatar>
        <v-btn v-for="type in this.result.types" :key="type.name" :color="setColor(type)">{{ type['type']['name'] }}</v-btn>

    </div>
</template>

<script>
    export default {
        data: () => ({
            result: [],
            isLoading: true,
        }),
        beforeCreate() {
            fetch('/api/pokemon/' + this.$route.params['pokemonName'])
                .then(res => res.json())
                .then(res => {
                    this.result = res
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => (this.isLoading = false))
        },
        methods: {
            setColor(type) {
                if(type['type']['name'] === "fire") return "red"
            }
        }
    }
</script>
