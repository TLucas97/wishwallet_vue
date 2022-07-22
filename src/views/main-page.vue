<template>
  <div class="main-wrapper white--text d-flex">
    <Animated-background />
    <div class="content-wrapper context">
      <div class="mt-16 pt-16">
        <v-row>
          <v-col class="pt-16 mt-16 first-col-flex">
            <h1>Anyone can trade</h1>
            <h3 class="pb-5 font-weight-medium">
              Klever offers a simple and intuitive interface where anyone can
              trade their cryptos with very low rates and minimum limits.
            </h3>
            <router-link to="/trading">
              <v-btn color="purple" class="white--text"
                >Start trade simulation</v-btn
              >
            </router-link>
          </v-col>
          <v-col cols="7" class="carousel-eraser">
            <img
              class="klever__banner"
              src="../assets/img/klever-banner.png"
              alt="klever-banner"
            />
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
      items: [
        {
          src: "https://s2.glbimg.com/Yu_YuutgYfolZ-h9rW52gH45iuU=/696x390/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/L/F/tLAOX9QCm7171sqJZFCA/075-porzycki-dogecoin210622-npbea-b.jpg",
          text: "Doge coin",
          trade: "https://klever.finance/trade-doge-pairs-on-klever-exchange/",
        },
        {
          src: "https://www.infomoney.com.br/wp-content/uploads/2022/03/andre-francois-mckenzie-JrjhtBJ-pGU-unsplash.jpg",
          text: "Bitcoin",
          trade:
            "https://play.google.com/store/apps/details?id=cash.klever.blockchain.wallet&hl=pt_BR&gl=US",
        },
        {
          src: "https://macmagazine.com.br/wp-content/uploads/2021/12/17-ethereum-scaled.jpg",
          text: "Ethereum",
          trade: "https://klever.finance/pt/tag/ethereum/",
        },
        {
          src: "https://media.seudinheiro.com/uploads/2022/05/criptomoedas-Terra-LUNA-bitcoin-BTC-hoje.png",
          text: "Luna coin",
          trade: "https://coinmarketcap.com/pt-br/currencies/klever/",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.main-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;

  .content-wrapper {
    width: 70%;
    margin-top: 2em;
  }

  h1 {
    font-size: 3rem;
  }

  .context {
    width: 80%;
    position: absolute;
  }

  .klever__banner {
    width: 100%;
    height: 450px;
  }

  @media (max-width: 1250px) {
    .carousel-eraser {
      display: none;
    }

    .first-col-flex {
      font-size: 1rem;
      margin-top: 0.5em !important;
      padding-top: 0.5em !important;
    }
  }
}
</style>
