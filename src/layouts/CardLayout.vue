<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="card m-auto border-light shadow">
          <div class="card-header bg-success text text-light py-0">
            <slot name="heading" />
          </div>
          <div class="card-body">
            <slot name="body" />
          </div>
          <div class="card-footer bg-transparent">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped></style>
