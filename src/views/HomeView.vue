<script lang="ts" setup></script>

<template>
  <section class="content">
    <div class="heading">
      <h1 class="heading-text">
        <span class="main-heading-text text-secondary"
          >ResTechs Online Pharmaceutical Management System</span
        >
        <span class="sub-heading-text text-success"
          >Your healthy life companion</span
        >
      </h1>
    </div>

    <div class="button-container">
      <RouterLink
        class="btn-success btn login-btn btn-animated"
        to="/dashboard"
        type="submit"
      >
        <span class="submit-text">Get started</span>
      </RouterLink>
    </div>
  </section>
</template>
<style scoped>
.content {
  height: 100vh !important;
  background-image: linear-gradient(
      to top right,
      rgba(191, 255, 235, 0.55),
      rgba(234, 255, 192, 0.55)
    ),
    url("@/assets/images/phamarceutical-tech.jpg") !important;
  background-size: cover !important;
  background-position: bottom !important;

  /*clip-path: polygon(0 0, 100% 0, 100% 85vh, 50% 100%, 100% 85vh);*/
  display: flex !important;
  flex-wrap: wrap !important;
  flex-direction: column !important;
  justify-content: space-evenly !important;
  align-items: center !important;
  position: relative !important;
}

.heading {
  position: relative !important;
  transform: translateY(-50%) !important;
}

.heading-text {
  /*position: absolute;
  top: 40px;
  left: 50px;*/
  text-transform: uppercase;
  text-align: center;

  /*transform: translate(-50%, -50%);*/
}

.main-heading-text {
  display: block;
  font-weight: 700;
  font-size: 3rem;
  letter-spacing: 7px;
  margin-bottom: 10px;

  animation: moveInFromRight 1s ease-out;
}

.sub-heading-text {
  display: block;
  font-size: 1.5rem;
  letter-spacing: 10px;
  margin-top: 15px;

  animation: moveInFromLeft 1s ease-out;
}

.login-btn {
  animation: moveInFromBottom 1s ease-out;
}

.login-btn:link,
.login-btn:visited {
  border-radius: 10em;
  padding: 10px 40px;
  text-transform: uppercase;
  font-weight: 100;
  transition: all 0.2s;
  position: relative;
}

.login-btn::after {
  content: "";
  display: inline-block;
  height: 100%;
  width: 100%;
  border-radius: 100px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  transition: all 0.4s;
  background-color: var(--bs-btn-bg);
}

.login-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.login-btn:active {
  transform: translateY(-1px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.btn:hover::after {
  transform: scaleX(1.4) scaleY(1.6);
  opacity: 0;
}

@keyframes moveInFromRight {
  0% {
    opacity: 0;
    transform: translate(50px);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
}

@keyframes moveInFromLeft {
  0% {
    opacity: 0;
    transform: translate(-50px);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
}

.btn-animated {
  animation: moveInFromBottom 0.5s ease-out 0.75s;
  animation-fill-mode: backwards;
}

@keyframes moveInFromBottom {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
}

@keyframes moveInFromTop {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
}
</style>
