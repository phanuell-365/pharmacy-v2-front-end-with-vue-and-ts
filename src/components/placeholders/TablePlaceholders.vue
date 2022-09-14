<template>
  <table class="table table-sm table-hover table-bordered border-light">
    <thead class="bg-success text-light">
      <tr>
        <th v-for="b in 4" :key="b" scope="col">
          <p class="placeholder-glow">
            <span class="placeholder col-6"></span>
          </p>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="n in 4" :key="n">
        <td v-for="m in 4" :key="m">
          <p class="placeholder-glow">
            <span class="placeholder col-10"></span>
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup></script>

<style scoped></style>
