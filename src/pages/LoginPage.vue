<template>
  <h1 class="text-center">Авторизация</h1>
  <login-form />
</template>
<script setup lang="ts">
import LoginForm from "../components/LoginForm.vue";
import useNotAuthPermission from "../hooks/useNotAuthPermission.ts";

useNotAuthPermission();
</script>
