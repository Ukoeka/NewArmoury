<template>
  <Dialog v-model:open="localOpen">
    <DialogContent
      class="bg-[#161b27] border border-[#1e2535] text-slate-100 p-0 gap-0 max-w-2xl rounded-xl shadow-2xl"
      hide-close
    >
      <!-- Header -->
      <DialogHeader class="px-6 pt-6 pb-4 border-b border-[#1e2535]">
        <div class="flex items-start justify-between">
          <div>
            <DialogTitle class="text-[17px] font-bold text-slate-100 mb-1">
              {{ props.initial ? "Edit User" : "Add New User" }}
            </DialogTitle>
            <DialogDescription class="text-[13px] text-slate-500 m-0">
              {{
                props.initial
                  ? "Update user account details"
                  : "Create a new user account"
              }}
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <!-- Form -->
      <form
        id="user-form"
        @submit="onSubmit"
        class="px-6 py-5 flex flex-col gap-4 max-h-[70vh] overflow-y-auto"
      >
        <!-- Row 1: First Name + Surname -->
        <div class="grid grid-cols-2 gap-4">
          <VeeField v-slot="{ field, errors }" name="first_name">
            <Field :data-invalid="!!errors.length">
              <FieldLabel>First Name</FieldLabel>
              <Input
                v-bind="field"
                :model-value="field.value"
                placeholder="John"
                type="text"
                class="bg-[#1a2030] border-[#1e2535] h-10.5 text-[13.5px]"
              />
              <FieldError :errors="errors" />
            </Field>
          </VeeField>
          <VeeField v-slot="{ field, errors }" name="surname">
            <Field :data-invalid="!!errors.length">
              <FieldLabel>Surname</FieldLabel>
              <Input
                v-bind="field"
                :model-value="field.value"
                placeholder="Mwamba"
                type="text"
                class="bg-[#1a2030] border-[#1e2535] h-10.5 text-[13.5px]"
              />
              <FieldError :errors="errors" />
            </Field>
          </VeeField>
        </div>

        <!-- Row 2: Initial + Title -->
        <div class="grid grid-cols-2 gap-4">
          <VeeField v-slot="{ field, errors }" name="initial">
            <Field :data-invalid="!!errors.length">
              <FieldLabel>Initial</FieldLabel>
              <Input
                v-bind="field"
                :model-value="field.value"
                placeholder="J"
                type="text"
                maxlength="3"
                class="bg-[#1a2030] border-[#1e2535] h-10.5 text-[13.5px]"
              />
              <FieldError :errors="errors" />
            </Field>
          </VeeField>
          <VeeField v-slot="{ field, errors }" name="title">
            <Field :data-invalid="!!errors.length">
              <FieldLabel>Title / Designation</FieldLabel>
              <Input
                v-bind="field"
                :model-value="field.value"
                placeholder="e.g. System Administrator"
                type="text"
                class="bg-[#1a2030] border-[#1e2535] h-10.5 text-[13.5px]"
              />
              <FieldError :errors="errors" />
            </Field>
          </VeeField>
        </div>

        <!-- Row 3: Username + Email -->
        <div class="grid grid-cols-2 gap-4">
          <VeeField v-slot="{ field, errors }" name="username">
            <Field :data-invalid="!!errors.length">
              <FieldLabel>Username</FieldLabel>
              <Input
                v-bind="field"
                :model-value="field.value"
                placeholder="j.mwamba"
                type="text"
                class="bg-[#1a2030] border-[#1e2535] h-10.5 text-[13.5px]"
              />
              <FieldError :errors="errors" />
            </Field>
          </VeeField>
          <VeeField v-slot="{ field, errors }" name="email">
            <Field :data-invalid="!!errors.length">
              <FieldLabel>Email</FieldLabel>
              <Input
                v-bind="field"
                :model-value="field.value"
                placeholder="john@example.com"
                type="email"
                class="bg-[#1a2030] border-[#1e2535] h-10.5 text-[13.5px]"
              />
              <FieldError :errors="errors" />
            </Field>
          </VeeField>
        </div>

        <!-- Row 4: Phone + Directorate -->
        <div class="grid grid-cols-2 gap-4">
          <VeeField v-slot="{ field, errors }" name="phone_number">
            <Field :data-invalid="!!errors.length">
              <FieldLabel>Phone Number</FieldLabel>
              <Input
                v-bind="field"
                :model-value="field.value"
                placeholder="+255712345678"
                type="text"
                class="bg-[#1a2030] border-[#1e2535] h-10.5 text-[13.5px]"
              />
              <FieldError :errors="errors" />
            </Field>
          </VeeField>
          <VeeField v-slot="{ field, errors }" name="directorate">
            <Field :data-invalid="!!errors.length">
              <FieldLabel>Directorate</FieldLabel>
              <Input
                v-bind="field"
                :model-value="field.value"
                placeholder="e.g. ICT"
                type="text"
                class="bg-[#1a2030] border-[#1e2535] h-10.5 text-[13.5px]"
              />
              <FieldError :errors="errors" />
            </Field>
          </VeeField>
        </div>

        <!-- Row 5: Department + Role -->
        <div class="grid grid-cols-2 gap-4">
          <VeeField v-slot="{ field, errors }" name="department">
            <Field :data-invalid="!!errors.length">
              <FieldLabel>Department</FieldLabel>
              <Input
                v-bind="field"
                :model-value="field.value"
                placeholder="e.g. Systems"
                type="text"
                class="bg-[#1a2030] border-[#1e2535] h-10.5 text-[13.5px]"
              />
              <FieldError :errors="errors" />
            </Field>
          </VeeField>

          <VeeField v-slot="{ field, errors }" name="role_id">
            <Field :data-invalid="!!errors.length">
              <FieldLabel>Role</FieldLabel>
              <Select
                :model-value="field.value"
                @update:model-value="field.onChange"
              >
                <SelectTrigger
                  class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg h-10.5 text-[13.5px] text-slate-100 focus:border-blue-500 focus:ring-0"
                >
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent
                  class="bg-[#1a2030] border border-[#1e2535] text-slate-100"
                >
                  <SelectItem
                    v-for="role in roles"
                    :key="role.id"
                    :value="role.id"
                    class="text-[13.5px] cursor-pointer focus:bg-[#252f42]"
                  >
                    {{ role.abbreviation }} — {{ role.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FieldError :errors="errors" />
            </Field>
          </VeeField>


        </div>

        <!-- Row 6: Branch + Password (create only) -->
        <div class="grid grid-cols-2 gap-4">
          <VeeField v-slot="{ field, errors }" name="branch_id">
            <Field :data-invalid="!!errors.length">
              <FieldLabel>Branch</FieldLabel>
              <Select
                :model-value="field.value"
                @update:model-value="field.onChange"
              >
                <SelectTrigger
                  class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg h-10.5 text-[13.5px] text-slate-100 focus:border-blue-500 focus:ring-0"
                >
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent
                  class="bg-[#1a2030] border border-[#1e2535] text-slate-100"
                >
                  <SelectItem
                    v-for="branch in branches"
                    :key="branch.id"
                    :value="branch.id"
                    class="text-[13.5px] cursor-pointer focus:bg-[#252f42]"
                  >
                    {{ branch.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FieldError :errors="errors" />
            </Field>
          </VeeField>

          <VeeField
            v-if="!props.initial"
            v-slot="{ field, errors }"
            name="password"
          >
            <Field :data-invalid="!!errors.length">
              <FieldLabel>Password</FieldLabel>
              <div class="flex items-center gap-2">
                <Input
                  v-bind="field"
                  :model-value="field.value"
                  placeholder="••••••••"
                  type="text"
                  class="bg-[#1a2030] border-[#1e2535] h-10.5 text-[13.5px] flex-1"
                />
                <button
                  type="button"
                  @click="() => setFieldValue('password', generatePassword())"
                  title="Generate password"
                  class="flex items-center justify-center w-10 h-10 rounded-lg bg-[#1a2030] border border-[#1e2535] text-slate-500 hover:text-blue-400 hover:border-blue-500/50 transition-colors cursor-pointer shrink-0"
                >
                  <RefreshCw :size="14" />
                </button>
              </div>
              <FieldError :errors="errors" />
            </Field>
          </VeeField>
        </div>

        <!-- Status -->
        <VeeField v-slot="{ field, errors }" name="status">
          <Field :data-invalid="!!errors.length">
            <FieldLabel>Status</FieldLabel>
            <Select :model-value="field.value" @update:model-value="field.onChange">
              <SelectTrigger class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg h-10.5 text-[13.5px] text-slate-100 focus:border-blue-500 focus:ring-0">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent class="bg-[#1a2030] border border-[#1e2535] text-slate-100">
                <SelectItem :value=UserStatus.ACTIVE class="text-[13.5px] cursor-pointer focus:bg-[#252f42]">Active</SelectItem>
                <SelectItem :value=UserStatus.BANNED class="text-[13.5px] cursor-pointer focus:bg-[#252f42]">Banned</SelectItem>
                <SelectItem :value=UserStatus.DISABLED class="text-[13.5px] cursor-pointer focus:bg-[#252f42]">Disabled</SelectItem>
                <SelectItem :value=UserStatus.SUSPENDED class="text-[13.5px] cursor-pointer focus:bg-[#252f42]">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <FieldError :errors="errors" />
          </Field>
        </VeeField>

        <!-- Active toggle -->
        <!-- <VeeField v-slot="{ field }" name="is_active">
          <div class="flex items-center gap-3 py-1">
            <button
              type="button"
              @click="field.onChange(!field.value)"
              :class="[
                'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200',
                field.value ? 'bg-blue-600' : 'bg-[#2d3748]',
              ]"
            >
              <span
                :class="[
                  'pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200',
                  field.value ? 'translate-x-4' : 'translate-x-0',
                ]"
              />
            </button>
            <span class="text-[13.5px] text-slate-300">Account Active</span>
          </div>
        </VeeField> -->
      </form>

      <!-- Footer -->
      <DialogFooter
        class="px-6 pb-6 pt-4 flex items-center justify-end gap-3 border-t border-[#1e2535]"
      >
        <Button
          @click="closeDialog"
          class="px-5 py-2.5 rounded-lg bg-transparent text-slate-400 text-[13px] font-semibold cursor-pointer border border-[#1e2535] hover:border-slate-600 hover:text-slate-200 transition-colors"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          form="user-form"
          class="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-[13px] font-semibold cursor-pointer border-none hover:bg-blue-700 transition-colors"
        >
          {{ props.initial ? "Save Changes" : "Create User" }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm, Field as VeeField } from "vee-validate";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useBranchApi } from "~/services/branch.service";
import { useRoleApi } from "~/services/role.service";
import type { BranchResponse } from "~/lib/models/Branch";
import type { RoleResponse } from "~/lib/models/Roles";
import { type UserCreate, type UpdateUser, UserStatus } from "~/lib/models/User";
import { RefreshCw } from "lucide-vue-next";
import { generatePassword } from "~/lib/helpers/password_generator";

const props = defineProps<{
  isOpen: boolean;
  initial?: UpdateUser | null;
}>();

const emits = defineEmits<{
  (e: "update:isOpen", value: boolean): void;
  (e: "confirm", payload: UpdateUser): void;
}>();

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one digit");

const baseSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  surname: z.string().min(1, "Surname is required"),
  initial: z.string().min(1, "Initial is required").max(3),
  title: z.string().min(1, "Title is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  phone_number: z.string().min(1, "Phone number is required"),
  directorate: z.string().min(1, "Directorate is required"),
  department: z.string().min(1, "Department is required"),
  role_id: z.string().uuid("Role is required"),
  branch_id: z.string().uuid("Branch is required"),
  status: z.nativeEnum(UserStatus),
  password: passwordSchema.optional(),
});

const createSchema = baseSchema.extend({
  password: passwordSchema
});

type FormSchema = z.infer<typeof baseSchema>

  
  const localOpen = ref(props.isOpen);
  const branches = ref<BranchResponse[]>([]);
  const roles = ref<RoleResponse[]>([]);
  
  watch(
    () => props.isOpen,
    (v) => (localOpen.value = v),
  );
  watch(localOpen, (v) => emits("update:isOpen", v));
  

const activeSchema = computed(() => props.initial ? baseSchema : createSchema) 

const { handleSubmit, setValues, resetForm, setFieldValue } = useForm<FormSchema>({
  validationSchema: computed(() => toTypedSchema(activeSchema.value)),
})


onMounted(async () => {
  const branchApi = useBranchApi();
  const roleApi = useRoleApi();
  const [br, ro] = await Promise.all([
    branchApi.getBranches(1, 100),
    roleApi.getRoles(),
  ]);
  branches.value = br.items;
  roles.value = ro.data;
});

watch(
  () => [props.isOpen, props.initial] as const,
  ([open, val]) => {
    if (!open) return
    if (val) {
      setValues({
        first_name:   val.first_name   ?? '',
        surname:      val.surname      ?? '',
        initial:      val.initial      ?? '',
        title:        val.title        ?? '',
        username:     val.username     ?? '',
        email:        val.email        ?? '',
        phone_number: val.phone_number ?? '',
        directorate:  val.directorate  ?? '',
        department:   val.department   ?? '',
        role_id:      val.role_id      ?? '',
        branch_id:    val.branch_id    ?? '',
        status:       (val.status as UserStatus) ?? UserStatus.ACTIVE,
      })
    } else {
      // full reset with only status defaulted — clears all other fields
      resetForm({
        values: {
          first_name: '', surname: '', initial: '', title: '',
          username: '', email: '', phone_number: '', directorate: '',
          department: '', role_id: '', branch_id: '',
          status: UserStatus.ACTIVE, password: '',
        }
      })
    }
  },
  { immediate: true },
)

const closeDialog = () => {
  localOpen.value = false
  setTimeout(() => resetForm({
    values: {
      first_name: '', surname: '', initial: '', title: '',
      username: '', email: '', phone_number: '', directorate: '',
      department: '', role_id: '', branch_id: '',
      status: UserStatus.ACTIVE, password: '',
    }
  }), 200)
}

const onSubmit = handleSubmit((values) => {
  const payload = props.initial
    ? (({ password, ...rest }) => rest)(values) // strip password on edit
    : values
  emits('confirm', payload as UpdateUser)
  localOpen.value = false
})

</script>
