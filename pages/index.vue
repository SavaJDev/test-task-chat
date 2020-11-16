<template>
    <v-container>
        <v-row>
            <v-col>
                <v-row justify="center">
                    <div>
                        <h1>Welcome to chat</h1>
                    </div>
                </v-row>
                <v-row justify="center">
                    <v-card min-width="310" width="400">
                        <v-card-text>
                            <v-card-title class="title d-flex justify-center">
                                <h2>Log In</h2>
                            </v-card-title>
                            <v-form ref="form" v-model="valid" :lazy-validation="false">
                                <v-text-field v-model="name" :counter="16" :rules="nameRules" label="Name" required></v-text-field>

                                <v-file-input accept="image/png, image/jpeg, image/bmp" :rules="fileRules" placeholder="Pick an avatar" type="file" prepend-icon="mdi-camera" label="Avatar" @change="filePicked"></v-file-input>

                                <v-card-actions class="btn d-flex justify-center">
                                    <v-btn :disabled="!valid" color="primary" class="mr-4" @click="submit">
                                        Sign in
                                    </v-btn>
                                </v-card-actions>

                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapActions} from 'vuex'
    
    export default {
        layout: 'logIn',
        components: {

        },
        data: () => ({
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 16) || 'Name must be less than 16 characters',
            ],
            imgFile: null,
            fileRules: [
                v => !!v || 'Avatar is required',
                v => (v && v.size < 3000000) || 'Avatar size should be less than 3 MB!'
            ]
        }),
        methods: {
            ...mapActions(["userProfile"]),
            submit() {
                if(this.$refs.form.validate()) {
                   const user = {
                       name: this.name,
                       avatar: this.imgFile    
                    }
                    this.userProfile(user);
                    this.$router.push("/chat"); 
                }
            },
            filePicked(e) {
                this.imgFile = URL.createObjectURL(e)
            }    
        },
        computed: {
            
        }    
    }

</script>
