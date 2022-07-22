<template>
  <div>
    <Animated-background />
    <div class="trade-view context">
      <!-- Settings dialog -->
      <v-dialog v-model="dialog" max-width="500px" persistent>
        <v-card style="background: #313241">
          <v-card-title>
            <span class="text-h5 white--text">Settings</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              {{ selectedList }}
              <v-row>
                <v-col>
                  <label class="white--text">Symbol</label>
                  <v-select
                    v-model="selectedSymbol"
                    color="white"
                    dense
                    solo
                    text-color="white"
                    :items="symbols"
                    label="Select symbol"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <label class="white--text">Language</label>
                  <v-select
                    v-model="selectedLang"
                    color="white"
                    dense
                    solo
                    text-color="white"
                    :items="langs"
                    label="Select language"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="d-flex justify-center align-center">
                  <v-radio-group v-model="selectedCalendar">
                    <template v-slot:label>
                      <div class="white--text">Calendar</div>
                    </template>
                    <v-radio value="Show">
                      <template v-slot:label>
                        <div class="white--text">Show</div>
                      </template>
                    </v-radio>
                    <v-radio value="Hide">
                      <template v-slot:label>
                        <div class="white--text">Hide</div>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-col>
                <v-col class="d-flex justify-center align-center">
                  <v-radio-group v-model="selectedDetails">
                    <template v-slot:label>
                      <div class="white--text">Details</div>
                    </template>
                    <v-radio value="Show">
                      <template v-slot:label>
                        <div class="white--text">Show</div>
                      </template>
                    </v-radio>
                    <v-radio value="Hide">
                      <template v-slot:label>
                        <div class="white--text">Hide</div>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-col>
                <v-col class="d-flex justify-center align-center">
                  <v-radio-group v-model="selectedHot">
                    <template v-slot:label>
                      <div class="white--text">Hotlist</div>
                    </template>
                    <v-radio value="Show">
                      <template v-slot:label>
                        <div class="white--text">Show</div>
                      </template>
                    </v-radio>
                    <v-radio value="Hide">
                      <template v-slot:label>
                        <div class="white--text">Hide</div>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-1"
              class="white--text"
              @click="dialog = false"
            >
              Cancel
            </v-btn>
            <v-btn color="success darken-1" @click="saveSettings"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Settings dialog -->
      <div class="view">
        <div class="d-flex justify-space-between">
          <h2 class="pb-3 white--text">Trading view simulation ↘</h2>
          <v-btn :color="themeColor" :class="themeClass" @click="changeTheme">{{
            themeText
          }}</v-btn>
        </div>
        <div class="trading-size">
          <VueTradingView
            v-show="themeDisplay"
            style="width: 100%"
            :options="tradeOptions"
            :key="componentKey"
          />
        </div>
        <div class="d-flex justify-end pt-3 buttons-shrink">
          <a target="_blank" href="https://klever.io/" class="a-btn">
            <v-btn color="success" class="mr-3">More information</v-btn>
          </a>
          <v-btn color="purple" class="white--text" @click="dialog = true"
            >Trading Simulation Settings</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTradingView from "vue-trading-view";
import AnimatedBackground from "../components/animated-background.vue";

export default {
  components: {
    VueTradingView,
    AnimatedBackground,
  },
  data() {
    return {
      dialog: false,
      componentKey: 0,
      themeText: "Change theme",
      themeColor: "black",
      themeClass: "white--text",
      themeDisplay: true,
      tradeOptions: {
        autosize: false,
        symbol: "BTCUSD",
        width: "100%",
        height: "100%",
        theme: "dark",
        timezone: "America/Sao_Paulo",
        style: "0",
        locale: "en",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        hide_top_toolbar: true,
        allow_symbol_change: true,
        watchlist: ["BITSTAMP:BTCUSD"],
        details: true,
        hotlist: true,
        calendar: true,
        studies: ["MOM@tv-basicstudies"],
        hide_side_toolbar: false,
      },
      symbols: [
        "BTCUSD",
        "LUNAUSDT",
        "BTCUSDT",
        "NIFTY",
        "BANKNIFTY",
        "XAUUSD",
        "ETHUSDT",
        "EURUSD",
        "DXY",
        "LUNAUSDTPERP",
        "SPX",
        "USDT.D",
        "ADAUSDT",
        "GOLD",
      ],
      langs: [
        {
          text: "English",
          value: "en",
        },
        {
          text: "Portuguese",
          value: "br",
        },
        {
          text: "French",
          value: "fr",
        },
        {
          text: "German",
          value: "de_DE",
        },
        {
          text: "Persian",
          value: "fa_IR",
        },
        {
          text: "Chinese",
          value: "zh_CN",
        },
      ],
      selectedSymbol: null,
      selectedLang: null,
      selectedHot: null,
      selectedDetails: null,
      selectedCalendar: null,
    };
  },
  methods: {
    changeTheme() {
      if (
        this.tradeOptions.theme === "dark" &&
        this.themeColor === "black" &&
        this.themeClass === "white--text"
      ) {
        this.tradeOptions.theme = "light";
        this.themeColor = "white";
        this.themeClass = "black--text";
        this.componentKey += 1;
        this.$toast.success("Theme changed to light");
      } else if (
        this.tradeOptions.theme === "light" &&
        this.themeColor === "white" &&
        this.themeClass === "black--text"
      ) {
        this.tradeOptions.theme = "dark";
        this.themeColor = "black";
        this.themeClass = "white--text";
        this.componentKey += 1;
        this.$toast.success("Theme changed to dark");
      }
    },
    saveSettings() {
      this.tradeOptions.symbol = this.selectedSymbol;
      this.tradeOptions.locale = this.selectedLang;

      this.selectedCalendar === "Show"
        ? (this.tradeOptions.calendar = true)
        : (this.tradeOptions.calendar = false);

      this.selectedDetails === "Show"
        ? (this.tradeOptions.details = true)
        : (this.tradeOptions.details = false);

      this.selectedHot === "Show"
        ? (this.tradeOptions.hotlist = true)
        : (this.tradeOptions.hotlist = false);

      this.componentKey += 1;
      this.dialog = false;
      this.$toast.success("Settings saved!");
    },
  },
};
</script>

<style scoped>
.trade-view {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.view {
  width: 55%;
}

.trading-size {
  height: 450px !important;
}

.context {
  position: absolute;
  top: 20vh;
}

.black {
  background: #1d212c !important;
}

@media (max-width: 1400px) {
  .trading-size {
    height: 250px !important;
  }
}

@media (max-width: 1078px) {
  .view {
    width: 85%;
  }
}
@media (max-width: 718px) {
  .view {
    width: 95%;
  }
}
@media (max-width: 520px) {
  .buttons-shrink {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    margin: 0 auto;
  }

  .trading-size {
    height: 250px !important;
  }

  .a-btn {
    margin-bottom: 0.5em;
  }
}
</style>
