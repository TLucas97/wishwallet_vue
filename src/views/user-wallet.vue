<template>
  <div class="white--text">
    <AnimatedBackground />
    <div class="wallet-header">
      <Header signButton="sign-off" logoRoute="/wallet" />
    </div>
    <div class="home d-flex justify-center align-center flex-column">
      <div class="d-flex align-center pt-10">
        <div class="pt-2">
          <h1>Crypto Wallet</h1>
        </div>
      </div>
      <div class="wallet-box mt-14 white-text">
        <v-data-table
          :headers="headers"
          :items="storageDesserts"
          hide-default-footer
          sort-by="calories"
          style="background: rgba(128, 128, 128, 0.158); opacity: 0.89"
        >
          <template slot="items" slot-scope="props">
            <tr @click="rowClick(props.item.name)">
              <td class="white-text">{{ props.item.name }}</td>
              <td class="text-xs-right">{{ props.item.balance }}</td>
            </tr>
          </template>
          <template v-slot:top>
            <v-toolbar flat style="background: rgba(128, 128, 128, 0.158)">
              <v-toolbar-title class="white--text">My tokens</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px" persistent>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="purple"
                    dark
                    class="mb-2 font-weight-bold"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Add token
                  </v-btn>
                </template>
                <v-card style="background: #313241">
                  <v-card-title>
                    <span class="text-h5 white--text">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col>
                          <v-text-field
                            v-model="editedItem.name"
                            label="Token"
                            :rules="[rules.required, rules.max]"
                            color="white"
                            text-color="white"
                            class="black--text"
                            solo
                            dense
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col style="color: white !important">
                          <money
                            class="v-money"
                            style="color: black !important"
                            v-model="editedItem.balance"
                            v-bind="money"
                          ></money>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="red darken-1"
                      @click="close"
                      class="white--text font-weight-bold"
                    >
                      Cancel
                    </v-btn>
                    <v-btn color="success darken-1" @click="save"> Save </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card style="background: #313241">
                  <v-card-title class="text-h5 white--text"
                    >Are you sure you want to delete this item?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="red darken-1"
                      class="white--text"
                      @click="closeDelete"
                      >CANCEL</v-btn
                    >
                    <v-btn color="success darken-1" @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon color="white" small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon color="white" small @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            <h3 class="white--text">Create your first token!</h3>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
import AnimatedBackground from "../components/animated-background.vue";
import Header from "../components/my-header.vue";

export default {
  components: {
    AnimatedBackground,
    Header,
  },
  data: () => ({
    storageDesserts: [],
    rules: {
      required: (value) => !!value || "Required field.",
      max: (v) => v.length <= 5 || "Max 5 characters",
    },
    snackbar: false,
    snackbar2: false,
    snackbar3: false,
    snackbar4: false,
    snackbar5: false,
    text: `You must fill all the forms.`,
    text2: `Can't save tokens above 5 characters.`,
    text3: `Can't create tokens with the same name`,
    text4: `Token successfully created!`,
    text5: `Token successfully updated!`,
    money: {
      decimal: ".",
      thousands: ".",
      prefix: "$ ",
      suffix: "",
      precision: 2,
      masked: true,
    },
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Tokens",
        align: "start",
        sortable: false,
        value: "name",
        class: "white--text h1",
      },
      { text: "Balance", value: "balance", class: "white--text" },
      {
        text: "Edit/Remove",
        value: "actions",
        sortable: false,
        class: "white--text",
      },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      balance: "",
    },
    defaultItem: {
      name: "",
      balance: "",
    },
  }),

  mounted() {
    if (localStorage.data) {
      let test = localStorage.getItem("data");
      this.storageDesserts = JSON.parse(test);
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Token" : "Edit Token";
    },
    formatNumber(n) {
      return "$ " + (Math.round(n * 100) / 100).toLocaleString();
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.storageDesserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.storageDesserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.storageDesserts.splice(this.editedIndex, 1);
      this.closeDelete();
      localStorage.setItem("data", JSON.stringify(this.storageDesserts));
      this.$toast.success("Token successfully deleted!");
      this.dialog = false;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (
        this.editedItem.name !== "" &&
        this.editedItem.balance !== 0 &&
        this.editedItem.name.length < 6
      ) {
        if (this.editedIndex > -1) {
          Object.assign(
            this.storageDesserts[this.editedIndex],
            this.editedItem
          );
          localStorage.setItem("data", JSON.stringify(this.storageDesserts));
          this.$toast.success("Token successfully saved!");
          this.dialog = false;
        } else {
          if (localStorage.data) {
            let test = localStorage.getItem("data");
            let tost = JSON.parse(test);
            var blob = tost.map((test) => test.name);
            console.log(blob);
          }

          if (localStorage.data) {
            if (blob.includes(this.editedItem.name)) {
              this.$toast.error("This token already exists");
            } else {
              const teste = this.editedItem.balance;
              console.log(parseInt(teste));
              this.storageDesserts.push(this.editedItem);
              localStorage.setItem(
                "data",
                JSON.stringify(this.storageDesserts)
              );
              this.$toast.success("Token successfully created!");
              this.dialog = false;
            }
          }

          if (localStorage.data === undefined) {
            const teste = this.editedItem.balance;
            console.log(parseInt(teste));
            this.storageDesserts.push(this.editedItem);
            localStorage.setItem("data", JSON.stringify(this.storageDesserts));
            this.$toast.success("Token successfully created!");
            this.dialog = false;
          }
        }
      } else if (this.editedItem.name.length > 5) {
        this.$toast.error("Can't save tokens above 5 characters.");
      } else {
        this.$toast.error("All fields are required.");
      }
    },
    exit() {
      this.$router.push("./");
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  color: rgb(255, 255, 255) !important;
}

.wallet-header {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1002;
  background: #13152a;
}

.home {
  width: 100%;
}

.wallet-box {
  background: rgba(128, 128, 128, 0.158);
  padding: 2em;
  border-radius: 25px;
  width: 50%;
}

h1 {
  color: white !important;
  font-size: 2.5rem;
}

.v-money {
  background: white;
  height: 38px;
  border-radius: 5px;
  color: black;
  padding-left: 10px;
}

.v-money:focus {
  outline: none;
}

.exit {
  position: absolute;
  bottom: 0;
  right: 0;
}

.exit-icon:hover {
  color: white !important;
  cursor: pointer;
}

@media (max-width: 900px) {
  .wallet-box {
    width: 80%;
  }
}
@media (max-width: 600px) {
  .wallet-box {
    width: 95%;
  }

  .home {
    padding-bottom: 1em;
  }
}
</style>
