<template>
  <h1 class="text-center">Информация о профиле</h1>
  <profile-form v-if="profile" />
  <spinner v-else class="fixed-center" />
</template>
<script lang="ts" setup>
import useUserStore from "../stores/userStore.ts";
import { storeToRefs } from "pinia";
import ProfileForm from "../components/ProfileForm.vue";
import Spinner from "../components/Spinner.vue";
import useAuthPermission from "../hooks/useAuthPermission.ts";

useAuthPermission();

const userStore = useUserStore();
const { profile } = storeToRefs(userStore);
</script>
