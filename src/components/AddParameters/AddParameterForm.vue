<template>
  <Form :validation-schema="paramAddSchema" :on-submit="onSubmit">
    <div v-for="name in Object.keys(paramAddSchema.fields)" :key="name" class="mb-3">
      <Field :name="name" v-slot="{ field, errors }">
        <label class="form-label">{{ name }}</label>
        <input v-bind="field" class="form-control" :class="{ 'is-invalid': errors.length }" />
        <ErrorMessage :name="name" class="invalid-feedback" />
      </Field>
    </div>
    <button class="d-block ms-auto btn btn-primary">Добавить</button>
  </Form>
</template>
<script lang="ts" setup>
import { ErrorMessage, Field, Form, FormActions } from "vee-validate";
import { paramAddSchema } from "../../schemas/paramSchemas.ts";
import { ParamAddFormData } from "../../types/paramsTypes.ts";
import useParamsToServerStore from "../../stores/paramsToServerStore.ts";

const paramsToServerStore = useParamsToServerStore();
const { addNewParam } = paramsToServerStore;

const onSubmit = (data: ParamAddFormData, actions: FormActions<ParamAddFormData>) => {
  addNewParam(data);
  actions.resetForm();
};
</script>
