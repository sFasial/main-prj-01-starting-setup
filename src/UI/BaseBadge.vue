<template>
    <span class="badge" :class="type">
        {{ text }}
    </span>
</template>

<script>
export default {
    // props: ['type','title'],
    props: {
        type: {
            required: false,
            type: String
        },
        title: {
            required: false,
            // type: Object
            type: String
        }
    },
    mounted() {
        // console.log('type:', this.type, 'title:', this.title);
    },
    computed : {
        text(){ 
            return this.title?.toUpperCase();
        }
    },
    data() {
        return {

        }
    }
}
</script>

<style scoped>
.badge {
    background-color: #ccc;
    color: #252525;
    border-radius: 30px;
    padding: 0.5rem 1.5rem;
    display: inline-block;
    margin-right: 0.5rem;
}

.frontend {
    background-color: #3d008d;
    color: white;
}

.backend {
    background-color: #71008d;
    color: white;
}

.career {
    background-color: #8d006e;
    color: white;
}
</style>

<!-- 
<template>
    <span class="badge" :class="type">
        {{ text }}
    </span>
</template>

<script>
export default {
    props: {
        type: {
            required: false,
            type: String
        }
    },
    mounted() {
        console.log('type:', this.type);
    },
    computed: {
        text() {
            return this.type ? this.type.toUpperCase() : '';
        }
    }
}
</script>

<style scoped>
.badge {
    background-color: #ccc;
    color: #252525;
    border-radius: 30px;
    padding: 0.5rem 1.5rem;
    display: inline-block;
    margin-right: 0.5rem;
}

.frontend {
    background-color: #3d008d;
    color: white;
}

.backend {
    background-color: #71008d;
    color: white;
}

.career {
    background-color: #8d006e;
    color: white;
}
</style> -->
