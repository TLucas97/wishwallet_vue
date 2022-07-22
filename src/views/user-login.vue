<template>
  <div class="login-component" :key="btnKey1">
    <Animated-background />
    <v-dialog
      v-model="dialog_loading"
      persistent
      width="200"
      overlay-opacity="0.8"
      class="loading-wrapper"
    >
      <div class="d-flex justify-center align-center pt-4 pb-4">
        <div class="lds-ring" style="overflow: hidden !important">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </v-dialog>
    <!-- account creation dialog -->
    <v-dialog v-model="dialog_register" max-width="330px" persistent>
      <v-card style="background: #313241">
        <v-card-title>
          <span class="text-h5 white--text pl-2 code">{{ accountLabel }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  label="Username"
                  color="white"
                  text-color="white"
                  solo
                  dense
                  required
                  v-model="newAccount.newEmail"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  label="Password"
                  color="white"
                  text-color="white"
                  solo
                  dense
                  required
                  type="password"
                  v-model="newAccount.newPassword"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            @click="dialog_register = false"
            class="white--text"
          >
            Cancel
          </v-btn>
          <v-btn color="success darken-1" @click="createAccount">
            {{ accountSubLabel }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- account creation dialog -->
    <div class="wallet-box context">
      <h2 class="white--text">
        Sign-in
        <v-icon color="white">mdi-login</v-icon>
      </h2>
      <div class="pt-7">
        <v-text-field
          v-model="email"
          label="Username"
          placeholder="Username"
          color="black"
          text-color="black"
          background-color="white"
          required
          solo
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          placeholder="Password"
          color="black"
          text-color="black"
          background-color="white"
          type="password"
          required
          solo
        ></v-text-field>
      </div>
      <div class="d-flex justify-end">
        <v-row>
          <v-col>
            <v-btn @click="dialog_register = true" color="success">{{
              accountLabel
            }}</v-btn>
          </v-col>
          <v-col>
            <v-btn @click="save" color="primary">Clear</v-btn>
          </v-col>
          <v-col>
            <v-btn color="purple" @click="login" class="white--text"
              >Sign-in</v-btn
            >
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import AnimatedBackground from "../components/animated-background.vue";

export default {
  components: {
    AnimatedBackground,
  },
  data() {
    return {
      btnKey1: 0,
      accountLabel: "",
      accountSubLabel: "",
      dialog_loading: false,
      dialog_register: false,
      email: "",
      password: "",
      newEmail: null,
      newAccount: {
        newEmail: "",
        newPassword: "",
      },
      currentAccount: [
        {
          newEmail: null,
          newPassword: null,
        },
      ],
    };
  },

  mounted() {
    if (localStorage.accountLabel) {
      this.accountLabel = localStorage.getItem("accountLabel");
      this.accountSubLabel = localStorage.getItem("accountSubLabel");
      console.log(this.accountLabel);
    } else {
      this.accountLabel = "Create Account";
      this.accountSubLabel = "Create";
    }
  },

  methods: {
    login() {
      if (localStorage.newAccount) {
        const currentAccount = localStorage.getItem("newAccount");
        this.currentAccount = JSON.parse(currentAccount);
      }
      if (
        (this.email === this.currentAccount.newEmail &&
          this.password === this.currentAccount.newPassword) ||
        (this.email === "user@gmail.com" && this.password === "123")
      ) {
        this.dialog_loading = true;
        setTimeout(() => {
          this.$router.push("/wallet");
        }, "3000");
      } else {
        this.$toast.error("Wrong email or password. Please try again.");
      }
    },
    save() {
      this.email = "";
      this.password = "";
    },
    createAccount() {
      if (
        this.newAccount.newEmail === "" &&
        this.newAccount.newPassword === ""
      ) {
        this.$toast.warning("You must fill all the fields.");
      } else {
        const newAccount = JSON.stringify(this.newAccount);
        localStorage.setItem("newAccount", newAccount);
        localStorage.setItem("accountLabel", "Update Account");
        localStorage.setItem("accountSubLabel", "Update");
        this.dialog_register = false;
        if (
          this.accountLabel === "Update Account" &&
          this.accountSubLabel === "Update"
        ) {
          this.$toast.success("Token successfully updated!");
        } else {
          this.accountLabel = "Update Account";
          this.accountSubLabel = "Update";
          this.$toast.success("Token successfully created!");
        }
      }
    },
  },
};
</script>

<style scoped>
.login-component {
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wallet-box {
  background: #80808028;
  padding: 2em;
  border-radius: 25px;
}

.loading-wrapper {
  z-index: 1001;
}

.context {
  position: absolute;
  top: 30vh;
}

@media (max-width: 478px) {
  .wallet-box {
    padding: 1em 2em 1em 2em;
    margin: 0em 3em 0em 3em;
  }
}
</style>
