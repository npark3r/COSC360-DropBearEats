<template>
  <div class="home-content">
    <div id="banner">
      <div class="container">
        <div class="row">
          <div class="col-md-6" id="promo">
            <p class="promo-title">EVEN DROPBEARS NEED TO EAT</p>
            <p>Browse our selection of cuisines and find your next meal!</p>
          </div>
          <div class="col-md-6">
            <a href="browse.html"><img src="../assets/img/koala.png"  alt="" id="koala"></a>
          </div>
        </div>
      </div>
    </div>

    <div>
      <b-carousel
          id="carous"
          v-model="slide"
          :interval="4000"
          controls
          indicators
          background="#ccc"
          img-width="1024"
          img-height="480"
          style="text-shadow: 1px 1px 2px #000;"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
      >
        <b-carousel-slide
            caption="Even DropBears Need to Eat"
            text="You'll find our great selection of cuisines good enough to die for!"
        >
          <template v-slot:img>
            <img
                class="d-block img-fluid w-100"
                width="1024"
                height="480"
                src="../assets/img/homepage.png"
                alt="image slot"
            >
          </template>
        </b-carousel-slide>
        <b-carousel-slide
            caption="Snap A Pic of Your Meal"
            text="Take a picture of your next meal and tag us with #DropBearEats"
        >
          <template v-slot:img>
            <img
                class="d-block img-fluid w-100"
                width="1024"
                height="480"
                src="../assets/img/social.jpg"
                alt="image slot"
            >
          </template>
        </b-carousel-slide>
      </b-carousel>
    </div>

    <div id="Footer">
      <div class="container">
        <div class="row">
          <div class = "col-md-12">
            <img src="../assets/img/footer-image.png" alt="" id="footer-image">
          </div>
        </div>
        <div class="row">
          <h2 class="our-mission">
            OUR MISSION
          </h2>

        </div>
        <div class="row">
          <p>
            We aim to bring you the best local foods available, for the best price. We offer free delivery in all urban areas.
          </p>
        </div>
      </div>
    </div>
  </div>

</template>
<script>

export default {
  name: 'Home',
  data() {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart() {
      this.sliding = true
    },
    onSlideEnd() {
      this.sliding = false
    }
  }
}
</script>
