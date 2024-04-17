<template>
  <spinner class="fixed-center" v-if="passwordResetIsLoading" />
  <Form :validation-schema="passwordResetSendEmailSchema" :on-submit="onSubmit" class="form mx-auto">
    <transition-group>
      <alert :message="passwordResetSuccess" type="success" v-if="passwordResetSuccess" />
      <alert :message="passwordResetError" type="error" v-if="passwordResetError" />
    </transition-group>
    <Field name="email" v-slot="{ field, errors }">
      <div class="mb-3">
        <label class="form-label" for="email">Email</label>
        <input
          v-bind="field"
          :class="{ 'is-invalid': errors.length }"
          type="email"
          id="email"
          class="form-control"
          placeholder="Введите ваш email указанный при регистрации"
        />
        <ErrorMessage name="email" class="invalid-feedback" />
      </div>
    </Field>
    <button class="btn btn-primary" :disabled="passwordResetIsLoading">Отправить</button>
  </Form>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ErrorMessage, Field, Form, FormActions } from 'vee-validate';
import { onBeforeUnmount } from 'vue';

import { passwordResetSendEmailSchema } from '../../schemas/userSchemas.ts';
import useUserStore from '../../stores/userStore.ts';
import { PasswordResetSendEmailData } from '../../types/userTypes.ts';
import Alert from '../Alert.vue';
import Spinner from '../Spinner.vue';

const userStore = useUserStore();
const { passwordResetSendEmail } = userStore;
const { passwordResetSuccess, passwordResetIsLoading, passwordResetError } = storeToRefs(userStore);

const onSubmit = async (data: PasswordResetSendEmailData, actions: FormActions<PasswordResetSendEmailData>) => {
  await passwordResetSendEmail(data);
  actions.resetForm();
};

onBeforeUnmount(() => {
  passwordResetSuccess.value = '';
  passwordResetError.value = '';
});
</script>
