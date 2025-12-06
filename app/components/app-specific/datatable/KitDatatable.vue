<script lang="ts">
import { z } from "zod"
import DraggableRow from "@/components/app-specific/DraggableRow.vue"
import DragHandle from "@/components/app-specific/DragHandle.vue"


// Remove firearm schema and replace with kit schema
export const schema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.enum(["Maintenance Kit", "Survival Kit", "Cleaning Kit", "Custom"]),
  items: z.number(),            // total number of items inside kit
  status: z.enum(["Available", "In Use", "Damaged", "Missing"]),
  location: z.string(),
  lastInspection: z.string(),   // ISO date
  notes: z.string().optional().nullable(),
})

export interface Kit {
  id: number
  name: string
  type: "Maintenance Kit" | "Survival Kit" | "Cleaning Kit" | "Custom"
  items: number
  status: "Available" | "In Use" | "Damaged" | "Missing"
  location: string
  lastInspection: string
  notes?: string | null
}
</script>

<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/vue-table"
import { RestrictToVerticalAxis } from "@dnd-kit/abstract/modifiers"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  EyeOff,
  MoreVertical,
  Columns,
  Plus,
} from "lucide-vue-next"
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table"
import { DragDropProvider } from "dnd-kit-vue"
import { Badge } from "@/components/ui/badge"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const props = defineProps<{
  data: Kit[]
}>()

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})

const columns: ColumnDef<Kit>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => h(DragHandle),
  },
  {
    id: "select",
    header: ({ table }) => h(Checkbox, {
      modelValue: table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate"),
      "onUpdate:modelValue": value => table.toggleAllPageRowsSelected(!!value),
    }),
    cell: ({ row }) => h(Checkbox, {
      modelValue: row.getIsSelected(),
      "onUpdate:modelValue": value => row.toggleSelected(!!value),
    }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Kit Name",
    cell: ({ row }) => row.original.name,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => row.original.type,
  },
  {
    accessorKey: "items",
    header: "Item Count",
    cell: ({ row }) => row.original.items.toString(),
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "lastInspection",
    header: "Last Inspection",
    cell: ({ row }) => new Date(row.original.lastInspection).toLocaleDateString(),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status
      const statusMap = {
        "Available": "bg-emerald-700",
        "In Use": "bg-blue-700",
        "Damaged": "bg-red-700",
        "Missing": "bg-rose-900",
      }
      return h(
        Badge,
        { variant: "outline", class: `px-3 ${statusMap[status]}` },
        () => status
      )
    },
  },
  {
    id: "actions",
    cell: () =>
      h(DropdownMenu, {}, {
        default: () => [
          h(DropdownMenuTrigger, { asChild: true }, () =>
            h(Button, { variant: "ghost", class: "h-8 w-8 p-0" }, () => h(MoreVertical))
          ),
          h(DropdownMenuContent, { align: "end" }, () => [
            h(DropdownMenuItem, {}, () => "View"),
            h(DropdownMenuItem, {}, () => "Edit"),
            h(DropdownMenuSeparator),
            h(DropdownMenuItem, { class: "text-red-600" }, () => "Delete"),
          ]),
        ],
      }),
  },
]

const table = useVueTable({
  get data() {
    return props.data
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onSortingChange: (updaterOrValue) => {
    sorting.value = typeof updaterOrValue === "function"
      ? updaterOrValue(sorting.value)
      : updaterOrValue
  },
  onColumnFiltersChange: (updaterOrValue) => {
    columnFilters.value = typeof updaterOrValue === "function"
      ? updaterOrValue(columnFilters.value)
      : updaterOrValue
  },
  onColumnVisibilityChange: (updaterOrValue) => {
    columnVisibility.value = typeof updaterOrValue === "function"
      ? updaterOrValue(columnVisibility.value)
      : updaterOrValue
  },
  onRowSelectionChange: (updaterOrValue) => {
    rowSelection.value = typeof updaterOrValue === "function"
      ? updaterOrValue(rowSelection.value)
      : updaterOrValue
  },
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return columnVisibility.value },
    get rowSelection() { return rowSelection.value },
  },
})
</script>

<template>
  
    <div value="outline" class="relative flex flex-col gap-4 overflow-auto">
      <div class="overflow-hidden rounded-lg border">
        <DragDropProvider :modifiers="[RestrictToVerticalAxis]">
          <Table>
            <TableHeader class="bg-muted sticky top-0 z-10">
              <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                <TableHead v-for="header in headerGroup.headers" :key="header.id" :col-span="header.colSpan">
                  <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                    :props="header.getContext()" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody class="**:data-[slot=table-cell]:first:w-8">
              <template v-if="table.getRowModel().rows.length">
                <DraggableRow v-for="row in table.getRowModel().rows" :key="row.id" :row="row" :index="row.index" />
              </template>
              <TableRow v-else>
                <TableCell :col-span="columns.length" class="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DragDropProvider>
        <!-- <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          > -->
        <!-- </DndContext> -->
      </div>
      <div class="flex items-center justify-between">
        <div class="text-muted-foreground hidden flex-1 text-sm lg:flex">
          {{ table.getFilteredSelectedRowModel().rows.length }} of
          {{ table.getFilteredRowModel().rows.length }} row(s) selected.
        </div>
        <div class="flex w-full items-center gap-8 lg:w-fit">
          <div class="hidden items-center gap-2 lg:flex">
            <Label for="rows-per-page" class="text-sm font-medium">
              Rows per page
            </Label>
            <Select :model-value="table.getState().pagination.pageSize" @update:model-value="(value) => {
              table.setPageSize(Number(value))
            }">
              <SelectTrigger id="rows-per-page" size="sm" class="w-20">
                <SelectValue :placeholder="`${table.getState().pagination.pageSize}`" />
              </SelectTrigger>
              <SelectContent side="top">
                <SelectItem v-for="pageSize in [10, 20, 30, 40, 50]" :key="pageSize" :value="`${pageSize}`">
                  {{ pageSize }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex w-fit items-center justify-center text-sm font-medium">
            Page {{ table.getState().pagination.pageIndex + 1 }} of
            {{ table.getPageCount() }}
          </div>
          <div class="ml-auto flex items-center gap-2 lg:ml-0">
            <Button variant="outline" class="hidden h-8 w-8 p-0 lg:flex" :disabled="!table.getCanPreviousPage()"
              @click="table.setPageIndex(0)">
              <span class="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button variant="outline" class="size-8" size="icon" :disabled="!table.getCanPreviousPage()"
              @click="table.previousPage()">
              <span class="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button variant="outline" class="size-8" size="icon" :disabled="!table.getCanNextPage()"
              @click="table.nextPage()">
              <span class="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button variant="outline" class="hidden size-8 lg:flex" size="icon" :disabled="!table.getCanNextPage()"
              @click="table.setPageIndex(table.getPageCount() - 1)">
              <span class="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  
</template>
