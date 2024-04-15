<template>
  <Form :on-submit="onSubmit" :validation-schema="loginUserSchema" class="form mt-3 mx-auto">
    <transition>
      <error-alert v-if="tokenError" :message="tokenError" type="error" />
    </transition>
    <div class="mb-3">
      <label for="username">Имя пользователя</label>
      <Field v-slot="{ field, errors }" name="username">
        <input
          v-bind="field"
          :class="{ 'is-invalid': errors.length }"
          class="form-control"
          id="username"
          placeholder="Введите имя пользователя"
        />
      </Field>
      <ErrorMessage name="username" class="invalid-feedback" />
    </div>
    <div class="mb-3">
      <label for="password">Пароль</label>
      <Field v-slot="{ field, errors }" name="password">
        <input
          v-bind="field"
          :class="{ 'is-invalid': errors.length }"
          class="form-control"
          id="password"
          type="password"
          placeholder="Введите ваш пароль"
        />
      </Field>
      <ErrorMessage name="password" class="invalid-feedback" />
      <router-link to="/password-reset" class="d-block mt-2 link-secondary">Забыли пароль?</router-link>
    </div>
    <div class="d-flex align-items-center gap-2">
      <button class="btn btn-primary" :disabled="tokenIsLoading">Войти</button>
      <router-link to="/register/" class="btn btn-link">Зарегистрироваться</router-link>
    </div>
  </Form>
  <login-with />
</template>
<script setup lang="ts">
import { loginUserSchema } from "../schemas/userSchemas.js";
import { ErrorMessage, Field, Form, FormActions } from "vee-validate";
import { LoginData } from "../types/userTypes.ts";
import useUserStore from "../stores/userStore.ts";
import { storeToRefs } from "pinia";
import ErrorAlert from "./Alert.vue";
import { onBeforeUnmount } from "vue";
import LoginWith from "./LoginWith.vue";

const userStore = useUserStore();
const { fetchTokens } = userStore;
const { tokenError, tokenIsLoading } = storeToRefs(userStore);
const onSubmit = async (data: LoginData, actions: FormActions<LoginData>) => {
  await fetchTokens(data);
  if (!tokenError) {
    actions.resetForm();
  }
};
onBeforeUnmount(() => {
  tokenError.value = "";
});
</script>
