<template>
  <Form :validation-schema="passwordChangeSchema" class="form mx-auto mt-3">
    <div class="mb-3">
      <Field name="oldPassword" v-slot="{ field, errors }">
        <label for="oldPassword" class="form-label">Старый пароль</label>
        <input
          v-bind="field"
          :class="{ 'is-invalid': errors.length }"
          id="oldPassword"
          type="password"
          class="form-control"
        />
        <ErrorMessage name="oldPassword" class="invalid-feedback" />
      </Field>
    </div>
    <div class="mb-3">
      <Field name="newPassword" v-slot="{ field, errors }">
        <label for="newPassword" class="form-label">Новый пароль</label>
        <input
          v-bind="field"
          :class="{ 'is-invalid': errors.length }"
          id="newPassword"
          type="password"
          class="form-control"
        />
        <ErrorMessage name="newPassword" class="invalid-feedback" />
      </Field>
    </div>
    <div class="mb-3">
      <Field name="passwordConfirm" v-slot="{ field, errors }">
        <label for="passwordConfirm" class="form-label">Подтвердите пароль</label>
        <input
          v-bind="field"
          :class="{ 'is-invalid': errors.length }"
          id="passwordConfirm"
          type="password"
          class="form-control"
        />
        <ErrorMessage name="passwordConfirm" class="invalid-feedback" />
      </Field>
    </div>
    <button class="btn btn-primary">Отправить</button>
  </Form>
</template>
<script lang="ts" setup>
import { ErrorMessage, Field, Form } from "vee-validate";
import { passwordChangeSchema } from "../schemas/userSchemas.ts";
</script>
