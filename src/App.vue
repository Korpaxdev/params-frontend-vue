<template>
  <navbar />
  <main>
    <div class="container mt-5 position-relative">
      <router-view />
    </div>
  </main>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import useAuth from './hooks/useAuth.ts';
import useTheme from './hooks/useTheme.ts';

useTheme();
useAuth();
</script>
