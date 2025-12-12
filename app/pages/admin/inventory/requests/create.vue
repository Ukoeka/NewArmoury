<script setup lang="ts">
definePageMeta({ layout: "admin-layout" })

import { ref } from "vue"
import { Card, CardContent, } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Upload, Trash2, PlusCircle, ChevronRight } from "lucide-vue-next"
import Button from "~/components/ui/button/Button.vue"
import Input from "~/components/ui/input/Input.vue"
import Textarea from "~/components/ui/textarea/Textarea.vue"
import { Select, SelectContent, SelectTrigger, SelectItem, SelectValue } from "~/components/ui/select"

// -------------------------------------------------------------
// STATE
// -------------------------------------------------------------
interface RequestItem {
    type: "firearm" | "kit" | "ammunition" | "";
    model: string;
    quantity: number | null;
}

const items = ref<RequestItem[]>([
    { type: "", model: "", quantity: null }
])

const notes = ref("")
const memoFile = ref<File | null>(null)

// -------------------------------------------------------------
// ACTIONS
// -------------------------------------------------------------
const addItem = () => {
    items.value.push({ type: "", model: "", quantity: null })
}

const removeItem = (index: number) => {
    items.value.splice(index, 1)
}

const handleFileUpload = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) memoFile.value = file
}

const submitRequest = () => {
    console.log("Submitting request:", {
        items: items.value,
        notes: notes.value,
        memoFile: memoFile.value,
    })
}
</script>

<template>
    <div class="min-h-screen bg-background">
        <main class="px-6 py-8 mx-auto max-w-7xl">

            <!-- Breadcrumbs -->
            <nav class="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <NuxtLink to="/admin/inventory/requests" class="hover:text-foreground">Requests</NuxtLink>
                <ChevronRight class="w-4 h-4" />
                <span class="font-medium text-foreground">Transfer ID</span>
            </nav>

            <div class="flex flex-col px-6 py-4 gap-5">
                <!-- Page Header -->
                <div>
                    <h1 class="text-4xl font-black tracking-tight">New Asset Request</h1>
                    <p class="text-muted-foreground mt-2">
                        Submit a formal request for firearms, kits, or ammunition from the main branch.
                    </p>
                </div>

                <!-- Main Form -->
                <Card>
                    <CardContent class="p-6 space-y-10">

                        <!-- Requested Items -->
                        <div class="space-y-4">
                            <p class="text-lg font-semibold">Requested Items</p>

                            <div class="rounded-lg border border-border overflow-x-auto">
                                <table class="w-full text-left">
                                    <thead class="border-b border-border bg-muted/40">
                                        <tr>
                                            <th class="px-4 py-3 text-sm font-medium w-[25%]">Asset Type</th>
                                            <th class="px-4 py-3 text-sm font-medium w-[45%]">Specific Item / Model
                                            </th>
                                            <th class="px-4 py-3 text-sm font-medium w-[20%]">Quantity</th>
                                            <th class="px-4 py-3 text-sm font-medium w-[10%]">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr v-for="(item, index) in items" :key="index" class="border-b border-border">
                                            <!-- TYPE -->
                                            <td class="p-2">
                                                <Select v-model="item.type">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="firearm">Firearm</SelectItem>
                                                        <SelectItem value="kit">Kit</SelectItem>
                                                        <SelectItem value="ammunition">Ammunition</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </td>

                                            <!-- MODEL -->
                                            <td class="p-2">
                                                <Input v-model="item.model" placeholder="e.g., M4A1 Carbine" />
                                            </td>

                                            <!-- QTY -->
                                            <td class="p-2">
                                                <Input v-model.number="item.quantity" type="number" min="1"
                                                    placeholder="e.g., 10" />
                                            </td>

                                            <!-- REMOVE -->
                                            <td class="p-2 text-center">
                                                <Button variant="ghost" size="icon"
                                                    class="text-destructive hover:bg-destructive/10"
                                                    @click="removeItem(index)">
                                                    <Trash2 class="w-5 h-5" />
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <Button variant="ghost" class="gap-2" @click="addItem">
                                <PlusCircle class="w-4 h-4" /> Add Item
                            </Button>
                        </div>

                        <Separator />

                        <!-- Notes -->
                        <div>
                            <label class="text-sm font-medium">Justification / Notes (Optional)</label>
                            <Textarea v-model="notes" placeholder="Enter justification for the request..."
                                class="mt-2 min-h-32" />
                        </div>

                        <!-- File Upload -->
                        <div>
                            <p class="text-sm font-medium mb-2">Attach Approval Memo</p>

                            <label for="memo-upload"
                                class="flex flex-col items-center justify-center w-full h-40 border border-dashed rounded-lg cursor-pointer hover:bg-muted/40 transition">
                                <Upload class="w-8 h-8 text-muted-foreground" />
                                <p class="mt-2 text-sm text-muted-foreground">
                                    <span class="text-primary font-semibold">Click to upload</span> or drag & drop
                                </p>
                                <p class="text-xs text-muted-foreground">PDF, DOCX (max 5MB)</p>

                                <input id="memo-upload" type="file" class="hidden" @change="handleFileUpload" />
                            </label>

                            <!-- Show selected file -->
                            <p v-if="memoFile" class="mt-2 text-sm text-muted-foreground">
                                Selected: <span class="font-medium">{{ memoFile?.name }}</span>
                            </p>
                        </div>

                        <Separator />

                        <!-- Actions -->
                        <div class="flex justify-end gap-4">
                            <Button variant="outline">Cancel</Button>
                            <Button @click="submitRequest">Submit Request</Button>
                        </div>

                    </CardContent>
                </Card>
            </div>
        </main>
    </div>
</template>
