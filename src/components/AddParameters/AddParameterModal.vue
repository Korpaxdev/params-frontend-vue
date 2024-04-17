<template>
  <teleport to="body">
    <div class="modal fade" tabIndex="-1" id="addModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Окно добавления параметра</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref="closeButton"
            ></button>
          </div>
          <div class="modal-body">
            <AddParameterForm :close-modal-func="closeModal" />
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">
import { ref } from 'vue';

import AddParameterForm from './AddParameterForm.vue';

const closeButton = ref<HTMLButtonElement | null>(null);
const closeModal = () => {
  if (closeButton.value) {
    closeButton.value.click();
  }
};
</script>
