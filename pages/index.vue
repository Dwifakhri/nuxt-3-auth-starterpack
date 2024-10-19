<script setup>
definePageMeta({
  layout: "default",
  middleware: "check-auth"
})

useHead({
  title: "Home"
})

const { signOut, data } = useAuth()

</script>

<template>
  <div class="main">
    <div class="cont">
      <h2>Welcome, <b>{{ data.username }}</b>!</h2>
      <div class="data">
        <div class="row">
          <div class="col label">Id</div>
          <div class="col colon">:</div>
          <div class="col value">{{ data.id }}</div>
        </div>
        <div class="row">
          <div class="col label">Username</div>
          <div class="col colon">:</div>
          <div class="col value">{{ data.username }}</div>
        </div>
        <div class="row">
          <div class="col label">Email</div>
          <div class="col colon">:</div>
          <div class="col value">{{ data.email }}</div>
        </div>
      </div>
      <button class="logout-btn" @click="signOut({ callbackUrl: '/login', external: true })">Logout</button>
    </div>
  </div>
</template>


<style>
.cont {
  width: 100%;
  max-width: 400px;
  margin: 0 15px;
}

.data {
  padding: 1rem;
  border: 1px solid rgb(172, 167, 167);
  border-radius: 8px;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.col {
  padding: 3px;
}

.label {
  flex: 0 0 100px;
  font-weight: bold;
}

.colon {
  flex: 0 0 20px;
  text-align: center;
}

.value {
  flex: 1;
  text-align: left;
}

.logout-btn {
  background-color: rgb(215, 15, 15);
}
</style>