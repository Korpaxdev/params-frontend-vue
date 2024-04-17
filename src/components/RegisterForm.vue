<template>
  <Form :validation-schema="registerSchema" :on-submit="onSubmit" class="form mx-auto position-relative">
    <spinner class="absolute-center" v-if="isRegisterLoading" />
    <transition-group>
      <alert :message="registerError" type="error" v-if="registerError" />
      <alert :message="registerSuccess" type="success" v-if="registerSuccess" />
    </transition-group>
    <div class="mb-3">
      <Field v-slot="{ field, errors }" name="username">
        <label for="username" class="form-label">Имя пользователя</label>
        <input v-bind="field" id="username" class="form-control" :class="{ 'is-invalid': errors.length }" />
        <ErrorMessage name="username" class="invalid-feedback" />
      </Field>
    </div>
    <div class="mb-3">
      <Field v-slot="{ field, errors }" name="email">
        <label for="email" class="form-label">Email</label>
        <input v-bind="field" id="email" class="form-control" :class="{ 'is-invalid': errors.length }" type="email" />
        <ErrorMessage name="email" class="invalid-feedback" />
      </Field>
    </div>
    <div class="mb-3">
      <Field v-slot="{ field, errors }" name="password">
        <label for="password" class="form-label">Пароль</label>
        <input
          v-bind="field"
          id="password"
          class="form-control"
          :class="{ 'is-invalid': errors.length }"
          type="password"
        />
        <ErrorMessage name="password" class="invalid-feedback" />
      </Field>
    </div>
    <div class="mb-3">
      <Field v-slot="{ field, errors }" name="password_confirm">
        <label for="password_confirm" class="form-label">Подтвердите пароль</label>
        <input
          v-bind="field"
          id="password_confirm"
          class="form-control"
          :class="{ 'is-invalid': errors.length }"
          type="password"
        />
        <ErrorMessage name="password_confirm" class="invalid-feedback" />
      </Field>
    </div>
    <button class="btn btn-primary">Отправить</button>
  </Form>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { ErrorMessage, Field, Form, FormActions } from 'vee-validate';
import { onBeforeUnmount } from 'vue';

import { registerSchema } from '../schemas/userSchemas.ts';
import useUserStore from '../stores/userStore.ts';
import { RegisterForm } from '../types/userTypes.ts';
import Alert from './Alert.vue';
import Spinner from './Spinner.vue';

const userStore = useUserStore();
const { register, registerClearStatuses } = userStore;
const { isRegisterLoading, registerError, registerSuccess } = storeToRefs(userStore);

const onSubmit = async (data: RegisterForm, actions: FormActions<RegisterForm>) => {
  await register(data);
  if (!registerError.value) {
    actions.resetForm();
  }
};
onBeforeUnmount(registerClearStatuses);
</script>
