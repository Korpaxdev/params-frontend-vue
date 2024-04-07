<template>
  <h1 class="text-center">Изменение пароля</h1>
  <password-change-form />
</template>
<script lang="ts" setup>
import useAuthPermission from "../hooks/useAuthPermission.ts";
import PasswordChangeForm from "../components/PasswordChangeForm.vue";

useAuthPermission();
</script>
