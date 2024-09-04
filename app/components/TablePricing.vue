<script setup lang="ts">
import { ref, reactive } from 'vue'

interface Blok {
  hideSection?: boolean;
  title?: string;
  description?: string;
  items?: any[];
  itemsSubscription?: any[];
  sectionNumber?: string;
}

const hideBotPrice = ref<boolean>(true)

const props = defineProps<{ blok: Blok }>()
const hideSection = computed(() => !!props.blok.hideSection)
const toggle = ref<boolean>(false)
const title = computed(() => props.blok.title)
const description = computed(() => props.blok.description)
const items = computed(() => props.blok.items)
const itemsSubscription = computed(() => props.blok.itemsSubscription)
const sectionNumber = computed(() => props.blok.sectionNumber || undefined)

const showModal = ref(false)
const selectedPlan = ref('')

const formData = reactive({
  name: '',
  email: ''
})

const handleCardButtonClick = (action: string, planTitle: string) => {
  switch (action) {
  case 'modal':
    showModal.value = true
    selectedPlan.value = planTitle
    break
  case 'redirect':
    const item = items.value.find(i => i.title === planTitle)
    if (item && item.button.href) {
      window.open(item.button.href, '_blank')
    }
    break
  case 'email':
    window.location.href = 'mailto:hello@regenrek.at'
    break
  }
}

const submitForm = () => {
  // Here you can implement the logic to handle the form submission
  console.log('Form submitted:', formData)
  // You might want to send this data to your backend or perform other actions
  // After submission, close the modal
  showModal.value = false
  // Reset the form data
  formData.name = ''
  formData.email = ''
}

const includedInEveryPlan = [
  { title: 'Dedicated Project Manager' },
  { title: 'Fast delivery in EU time zone (Mo-Fr)' },
  { title: 'Free & unlimited revisions in subscriptions' },
  { title: 'Works with agencies too / white-labeled' },
  { title: 'Stock photos & Stock illustrations included' },
  { title: 'Deliverables in Figma, Code, live Project' },
  { title: 'Real-time Slack collaboration' }
]
</script>

<template>
  <UContainer>
    <div class="grid gap-y-6">
      <!-- card price -->
      <div class="flex justify-center">
        <div v-if="!toggle" class="grid md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 grid-cols-1 gap-6 w-full">
          <CardPrice
            v-for="item in items"
            :key="item.id"
            v-bind="item"
            @button-click="handleCardButtonClick"
          />
        </div>
      </div>

      <div
        v-if="!hideBotPrice"
        class="flex flex-col bg-gray-50 dark:bg-gray-800 rounded-3xl text-cod-gray-100 px-8 py-8 lg:p-10 shadow-lg"
      >
        <Typo
          tag="h3"
          size="md"
          class="font-semibold text-bg-cod-gray-100"
        >
          Included with every plan
        </Typo>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Typo
            tag="ul"
            size="base"
            theme="light"
            class="flex flex-col gap-y-3.5 pt-4"
          >
            <li
              v-for="(item, index) in includedInEveryPlan.slice(0, 3)"
              :key="index"
              class="flex gap-x-1 items-start"
            >
              <Icon
                name="lucide:arrow-up-right"
                class="opacity-50 mr-1 text-cod-gray-100"
              />
              <Typo tag="span" size="sm" class="leading-none dark:text-white">
                {{
                  item.title
                }}
              </Typo>
            </li>
          </Typo>

          <Typo
            tag="ul"
            size="base"
            theme="light"
            class="flex flex-col gap-y-3.5 pt-4"
          >
            <li
              v-for="(item, index) in includedInEveryPlan.slice(3, 6)"
              :key="index"
              class="flex gap-x-1 items-start"
            >
              <Icon
                name="lucide:arrow-up-right"
                class="opacity-50 mr-1 text-cod-gray-100"
              />
              <Typo tag="span" size="sm" class="leading-none">
                {{
                  item.title
                }}
              </Typo>
            </li>
          </Typo>

          <Typo
            tag="ul"
            size="base"
            theme="light"
            class="flex flex-col gap-y-3.5 pt-4"
          >
            <li
              v-for="(item, index) in includedInEveryPlan.slice(6)"
              :key="index"
              class="flex gap-x-1 items-start"
            >
              <Icon
                name="lucide:arrow-up-right"
                class="opacity-50 mr-1 text-cod-gray-100"
              />
              <Typo tag="span" size="sm" class="leading-none">
                {{
                  item.title
                }}
              </Typo>
            </li>
          </Typo>
        </div>
      </div>
    </div>
  </UContainer>

  <!-- Modal for the free plan -->
  <UModal v-model="showModal">
    <UCard>
      <template #header>
        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
          Get Started with {{ selectedPlan }}
        </h3>
      </template>

      <form class="space-y-4" @submit.prevent="submitForm">
        <UInput v-model="formData.name" label="Name" />
        <UInput v-model="formData.email" label="Email" type="email" />
        <UButton type="submit" label="Submit" class="w-full" />
      </form>
    </UCard>
  </UModal>
</template>