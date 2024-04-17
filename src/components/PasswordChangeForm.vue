<template>
  <Form :validation-schema="passwordChangeSchema" :on-submit="onSubmit" class="form mx-auto mt-3 position-relative">
    <spinner v-if="passwordUpdateIsLoading" class="absolute-center" />
    <transition-group>
      <alert :message="passwordUpdateError" type="error" v-if="passwordUpdateError" />
      <alert :message="passwordUpdateSuccess" type="success" v-if="passwordUpdateSuccess" />
    </transition-group>
    <div class="mb-3">
      <Field name="old_password" v-slot="{ field, errors }">
        <label for="old_password" class="form-label">Старый пароль</label>
        <input
          v-bind="field"
          :class="{ 'is-invalid': errors.length }"
          id="old_password"
          type="password"
          class="form-control"
        />
        <ErrorMessage name="old_password" class="invalid-feedback" />
      </Field>
    </div>
    <div class="mb-3">
      <Field name="new_password" v-slot="{ field, errors }">
        <label for="new_password" class="form-label">Новый пароль</label>
        <input
          v-bind="field"
          :class="{ 'is-invalid': errors.length }"
          id="new_password"
          type="password"
          class="form-control"
        />
        <ErrorMessage name="new_password" class="invalid-feedback" />
      </Field>
    </div>
    <div class="mb-3">
      <Field name="password_confirm" v-slot="{ field, errors }">
        <label for="password_confirm" class="form-label">Подтвердите пароль</label>
        <input
          v-bind="field"
          :class="{ 'is-invalid': errors.length }"
          id="password_confirm"
          type="password"
          class="form-control"
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

import { passwordChangeSchema } from '../schemas/userSchemas.ts';
import useUserStore from '../stores/userStore.ts';
import { ChangePasswordForm } from '../types/userTypes.ts';
import Alert from './Alert.vue';
import Spinner from './Spinner.vue';

const userStore = useUserStore();
const { changePassword } = userStore;
const { passwordUpdateIsLoading, passwordUpdateError, passwordUpdateSuccess } = storeToRefs(userStore);

const onSubmit = async (data: ChangePasswordForm, action: FormActions<ChangePasswordForm>) => {
  await changePassword(data);
  if (!passwordUpdateError.value) {
    action.resetForm();
  }
};
</script>
