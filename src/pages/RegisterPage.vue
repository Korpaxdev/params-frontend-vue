<template>
  <h1 class="text-center">Регистрация</h1>
  <register-form />
</template>
<script setup lang="ts">
import RegisterForm from '../components/RegisterForm.vue';
import useNotAuthPermission from '../hooks/useNotAuthPermission.ts';

useNotAuthPermission();
</script>
