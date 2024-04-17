<template>
  <h1 class="text-center">Изменение пароля</h1>
  <password-change-form />
</template>
<script lang="ts" setup>
import PasswordChangeForm from '../components/PasswordChangeForm.vue';
import useAuthPermission from '../hooks/useAuthPermission.ts';

useAuthPermission();
</script>
