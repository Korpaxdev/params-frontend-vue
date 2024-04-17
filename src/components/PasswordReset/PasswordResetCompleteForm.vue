<template>
  <spinner class="fixed-center" v-if="passwordResetCompleteIsLoading" />
  <Form :validation-schema="passwordResetCompleteSchema" :on-submit="onSubmit" class="form mx-auto">
    <transition-group>
      <alert :message="passwordResetCompleteError" type="error" v-if="passwordResetCompleteError" />
      <alert :message="passwordResetCompleteSuccess" type="success" v-if="passwordResetCompleteSuccess" />
    </transition-group>
    <div class="mb-3">
      <Field name="new_password" v-slot="{ field, errors }">
        <label class="form-label" for="new_password">Новый пароль</label>
        <input
          v-bind="field"
          :class="{ 'is-invalid': errors.length }"
          class="form-control"
          id="new_password"
          type="password"
        />
        <ErrorMessage name="new_password" class="invalid-feedback" />
      </Field>
    </div>
    <div class="mb-3">
      <Field name="password_confirm" v-slot="{ field, errors }">
        <label class="form-label" for="password_confirm">Подтвердите пароль</label>
        <input
          v-bind="field"
          :class="{ 'is-invalid': errors.length }"
          class="form-control"
          id="password_confirm"
          type="password"
        />
        <ErrorMessage name="password_confirm" class="invalid-feedback" />
      </Field>
    </div>
    <button class="btn btn-primary" :disabled="passwordResetCompleteIsLoading">Отправить</button>
  </Form>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ErrorMessage, Field, Form, FormActions } from 'vee-validate';
import { computed, onBeforeUnmount } from 'vue';

import router from '../../routes/router.ts';
import { passwordResetCompleteSchema } from '../../schemas/userSchemas.ts';
import useUserStore from '../../stores/userStore.ts';
import { PasswordResetCompleteData } from '../../types/userTypes.ts';
import Alert from '../Alert.vue';
import Spinner from '../Spinner.vue';

const token = computed<string>(() => router.currentRoute.value.params.token as string);
const userStore = useUserStore();
const { passwordResetComplete } = userStore;
const { passwordResetCompleteIsLoading, passwordResetCompleteSuccess, passwordResetCompleteError } =
  storeToRefs(userStore);

const onSubmit = async (data: PasswordResetCompleteData, actions: FormActions<PasswordResetCompleteData>) => {
  if (token.value) {
    await passwordResetComplete(data, token.value);
    if (passwordResetCompleteSuccess.value) {
      actions.resetForm();
    }
  }
};
onBeforeUnmount(() => {
  passwordResetCompleteSuccess.value = '';
  passwordResetCompleteError.value = '';
});
</script>
