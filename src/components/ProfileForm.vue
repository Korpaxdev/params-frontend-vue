<template>
  <form class="form mx-auto mt-3 position-relative" @submit="onSubmit" @reset="form.resetForm">
    <spinner class="absolute-center" v-if="profileIsLoading" />
    <transition>
      <alert v-if="profileUpdateError" :message="profileUpdateError" type="error" />
    </transition>
    <div class="mb-3">
      <label for="username" class="form-label">Имя пользователя</label>
      <input
        v-model="username"
        v-bind="usernameProps"
        :disabled="!editMode"
        :class="{ 'is-invalid': errors.username }"
        class="form-control"
        id="username"
        name="username"
      />
      <div class="invalid-feedback" v-if="errors.username">{{ errors.username }}</div>
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Email пользователя</label>
      <input
        v-model="email"
        v-bind="emailProps"
        :disabled="!editMode"
        :class="{ 'is-invalid': errors.email }"
        class="form-control"
        id="email"
        name="email"
      />
      <div class="invalid-feedback" v-if="errors.email">{{ errors.email }}</div>
    </div>
    <div class="d-flex align-items-center gap-2" v-if="!editMode">
      <button type="button" class="btn btn-primary" @click="editMode = true">Редактировать</button>
      <router-link to="/password-change/" class="btn btn-link">Изменить пароль</router-link>
    </div>
    <div class="d-flex justify-content-between" v-else>
      <button class="btn btn-primary" type="submit">Отправить</button>
      <button class="btn btn-outline-secondary" @click="disableEditMode()">Отменить редактирование</button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import useUserStore from "../stores/userStore.ts";
import { storeToRefs } from "pinia";
import { Form, useForm } from "vee-validate";
import { onBeforeUnmount, ref, watch } from "vue";
import { Profile, ProfileFormData } from "../types/userTypes.ts";
import Spinner from "./Spinner.vue";
import Alert from "./Alert.vue";
import { profileSchema } from "../schemas/userSchemas.ts";

const userStore = useUserStore();
const { updateProfile } = userStore;
const { profile, profileIsLoading, profileUpdateError } = storeToRefs(userStore);
const editMode = ref(false);

const form = useForm<Profile>({ validationSchema: profileSchema });
const { errors } = form;
const [username, usernameProps] = form.defineField("username");
const [email, emailProps] = form.defineField("email");

const disableEditMode = () => {
  editMode.value = false;
  form.resetForm();
  profileUpdateError.value = "";
};
const onSubmit = form.handleSubmit(async (formData: ProfileFormData) => {
  await updateProfile(formData);
  if (!profileUpdateError.value) {
    editMode.value = false;
    form.resetForm();
  }
});

watch(
  editMode,
  () => {
    if (!editMode.value) {
      username.value = profile.value!.username;
      email.value = profile.value!.email;
    }
  },
  { immediate: true },
);
onBeforeUnmount(() => {
  disableEditMode();
});
</script>
