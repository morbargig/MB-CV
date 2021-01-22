<template>
  <div class="new-container">
    <div>
      <div v-if="changePdf">
        <input type="file" @change="handleImage" />
        <button @click="handleUpload">Upload Image</button>
      </div>
      <h2 class="header text-to-center">
        {{ !h ? "Mor Bargig CV" : ' מור ברגיג קו"ח' }}
      </h2>
      <div class="full-width font-size-16">
        <button
          :class="x ? 'disabled' : null"
          name="EngPDF"
          :style="h ? 'float: right;' : 'float: left;'"
          @click="getPDF"
        >
          {{ !h ? "English" : " אנגלית" }}
        </button>
        <button
          :class="h ? 'disabled' : null"
          name="HebPDF"
          :style="h ? 'float: right;' : 'float: left;'"
          @click="getPDF"
        >
          {{ !h ? "Hebrew" : "עברית" }}
        </button>
        <button
          :class="l ? 'disabled' : null"
          name="linkedin"
          :style="h ? 'float: right;' : 'float: left;'"
          @click="getPDF"
        >
          {{ !h ? "linkedin" : "לינקדין" }}
        </button>
      </div>
      <div class="topnav">
        <a @click="openMenu = !openMenu" class="active">Menu</a>
        <div v-if="openMenu" id="myLinks" class="full-width">
          <span class="links-container">
            <a :href="url" target="blank">pdf</a>
            <a href="https://5d60919cef31b.site123.me/" target="blank"
              >My Web Site</a
            >
            <a href="https://github.com/morbargig" target="blank">GitHub</a>
            <a
              href="https://www.linkedin.com/in/mor-bargig-744854182/"
              target="blank"
              >LinkedIn</a
            >
            <a href="tel:+972 52-861-2379" target="blank"> Contact </a>
            <a href="mailto:mobargig@gmail.com" target="blank"> Email</a>
          </span>
          <a @click="admin" class="Admin">Admin ?</a>
        </div>
        <div v-else class="full-width">
          <a
            class="Portfolio"
            href="https://morbargig.github.io/"
            target="blank"
          >
            Portfolio <span></span>
            <img
              class="Portfolio-img"
              src="smallMorBargigSig.png"
              alt="Javascript"
              :style="`border-radius: 50%; height: ${25 * $px}px; width: ${
                25 * $px
              }px; margin-left: 0.25em`"
            />
          </a>
        </div>
      </div>
      <div v-if="$isMobile">
        <iframe
          title="pdf"
          id="pdf"
          name="pdf"
          :src="url"
          width="100%"
          :height="`${$px > 3 ? 550 * $px : 5000 * $px}px`"
          frameBorder="0"
          scrolling="yes"
          style="height: calc(100vw * 1.5)"
        >
          <p>It appears your web browser doesn't support iframes.</p>
        </iframe>
      </div>

      <div v-else>
        <embed
          id="pdf"
          name="pdf"
          type="application/pdf"
          :src="url"
          width="100%"
          height="1000px"
          alt="pdf"
          pluginspage="http://www.adobe.com/products/acrobat/readstep2.html"
          background-color="0xFF525659"
          top-toolbar-height="56"
          full-frame=""
          internalinstanceid="22"
          title="Mor Bargig"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PdfApi from "@/api/PdfApi";
import localforage from "localforage";

export default {
  name: "App",
  data() {
    return {
      openMenu: false,
      changePdf: false,
      x: false,
      l: false,
      h: false,
      url:
        "https://firebasestorage.googleapis.com/v0/b/morbargig-a81d2.appspot.com/o/CV%2Fno-photo-available.png?alt=media&token=27b382af-7a35-4551-ade9-5edb5271df6b",
    };
  },
  created() {
    localforage.getItem("VERSION").then((version) => {
      let app_version = process.env.VUE_APP_VERSION;
      if (version !== app_version) {
        localforage.clear();
        localforage.setItem("VERSION", app_version);
      }
      this.setPdfs();
    });
  },
  methods: {
    setPdfs() {
      PdfApi.getPdf()
        .then((data) => {
          this.url = data[data.language];
          this.EngPDF = data.EngPDF;
          this.HebPDF = data.HebPDF;
          this.HebPDF = data.HebPDF;
          this.linkedin = data.linkedin;
          this.language = data.language;
          this.setLanguage();
        })
        .catch((err) => {
          console.error(err);
          PdfApi.newPdf();
          this.created();
        });
    },
    setLanguage() {
      this.x = this.language === "EngPDF";
      this.l = this.language === "linkedin";
      this.h = this.language === "HebPDF";
    },
    handleImage(e) {
      if (e.target.files[0]) {
        const image = e.target.files[0];
        this.uploadedImage = image;
      }
    },
    handleUpload() {
      const { uploadedImage } = this;
      if (uploadedImage === null) {
        alert("Please pick a valid image!");
      } else {
        PdfApi.uplodadPdf(uploadedImage).then((url) => {
          this.img = url;
          this.updatePdf();
        });
      }
    },
    admin() {
      let Password = prompt("Please enter your Admin Password", "Password");

      if (Password === null || Password === "" || Password === "Password") {
        return null;
      }
      if (Password === "bargig123456") {
        this.changePdf = true;
      }
      if (Password !== "bargig123456") {
        alert("Hi your not my Admin, watch out!! ");
      }
    },
    async updatePdf() {
      let answer = prompt("R U Update English PDF", "yes ,no or link");
      let language;
      if (answer === null || answer === "" || answer === "yes ,no or link") {
        alert(" cencel update");
      }
      if (answer === "yes") {
        language = "EngPDF";
      }
      if (answer === "no") {
        language = "HebPDF";
      }
      if (answer === "link") {
        language = "linkedin";
      }
      let pdf = this.img;
      let upDate = {
        [language]: pdf,
        language: language,
      };
      await PdfApi.updatePdf(upDate);
      this.language = language;
      this.setLanguage();
      this.setPdfs();
    },
    getPDF(e) {
      let name = e.target.name;
      let upDate = {
        language: name,
      };
      this.url = this[name];
      this.language = name;
      this.setLanguage();
      PdfApi.updatePdf(upDate);
    },
  },
};
</script>

<style lang="less">
.header {
  text-align: center;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}

.topnav {
  height: 70 * @Px;
  width: 100%;
  display: flex;
  align-items: center;

  overflow: hidden;
  background-color: #333;
  position: relative;
  #myLinks {
    height: 70 * @Px;
    display: flex;
    justify-content: space-between;
    .links-container {
      display: flex;
    }
  }
}

.topnav a {
  float: left;
  color: black;
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0 15 * @Px;
  text-decoration: none;
  font-size: 30 * @Px;
}

.topnav a.Admin {
  float: right;
  height: 70 * @Px;
  color: white;
  background: black;
}

.topnav a:hover {
  background-color: #ddd;
}

.active {
  background-color: #4caf50;
  color: white;
  height: 70 * @Px;
}

.topnav a.Portfolio {
  height: 70 * @Px;
  float: right;
}

button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15 * @Px 32 * @Px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4 * @Px 4 * @Px;
  font-size: 35 * @Px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
}

button:hover {
  box-shadow: 0 12 * @Px 16 * @Px 0 rgba(0, 0, 0, 0.24),
    0 17 * @Px 50 * @Px 0 rgba(0, 0, 0, 0.19);
}

.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
@media @Mobile {
  @Px: @MobileOnePix;
  .topnav {
    height: 40 * @Px;
    width: 100%;
    #myLinks {
      height: 40 * @Px;
    }
  }
  button {
    padding: 10 * @Px 20 * @Px;
    margin: 3 * @Px 1.5 * @Px;
    font-size: 18 * @Px;
  }
  .active {
    height: 40 * @Px;
  }
  .topnav a.Admin {
    height: 40 * @Px;
  }
  .topnav a.Portfolio {
    height: 40 * @Px;
    .Portfolio-img {
      margin-left: 0.5em !important;
    }
  }
  .topnav a {
    width: fit-content;
    padding: 0 5 * @Px;
    font-size: 11 * @Px;
  }
}
</style>


