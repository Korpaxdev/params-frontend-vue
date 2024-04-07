<template>
  <navbar />
  <main>
    <div class="container mt-5">
      <router-view />
    </div>
  </main>
</template>

<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import useTheme from "./hooks/useTheme.ts";
import useAuth from "./hooks/useAuth.ts";

useTheme();
useAuth();
</script>
