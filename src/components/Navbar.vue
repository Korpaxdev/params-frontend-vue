<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <router-link to="/" class="navbar-brand">Task2</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" active-class="active" class="nav-link">Главная</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link to="/login/" class="btn btn-outline-secondary">Войти</router-link>
          </li>
          <template v-else>
            <li class="nav-item">
              <router-link to="/profile/" class="nav-link" active-class="active">{{ profile!.username }}</router-link>
            </li>
            <li class="nav-item">
              <button class="btn btn-secondary" @click="logout">Выйти</button>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script lang="ts" setup>
import useUserStore from "../stores/userStore.ts";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { logout } = userStore;
const { isAuthenticated, profile } = storeToRefs(userStore);
</script>
