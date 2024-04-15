<template>
  <div class="my-3">
    <h4 class="text-center">Войти с помощью</h4>
    <div class="d-flex justify-content-center align-items-center gap-2">
      <a :href="buildUrl('google')" class="btn btn-success"><i class="bi bi-google"></i> Google</a>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { OauthProviders } from "../types/userTypes.ts";

const buildUrl = (provider: OauthProviders) => {
  const baseOauthUrl = `${import.meta.env.VITE_BASE_URL}users/oauth/login/`;
  const searchParams = new URLSearchParams({ next: `${window.location.host}/oauth/` });
  switch (provider) {
    case "google":
      return `${baseOauthUrl}google-oauth2?${searchParams}`;
    default:
      return "#";
  }
};
</script>
