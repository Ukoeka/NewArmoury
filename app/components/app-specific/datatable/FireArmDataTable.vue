<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/vue-table"
import { RestrictToVerticalAxis } from "@dnd-kit/abstract/modifiers"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreVertical,
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
import DraggableRow from "@/components/app-specific/DraggableRow.vue"
import DragHandle from "@/components/app-specific/DragHandle.vue"
import type { Firearm } from "~/lib/models/Firearm"
import { statusToColor } from "~/lib/utils"

const props = defineProps<{
  data: Firearm[],
  onDelete: (kit: Firearm) => void,
  onView: (kit: Firearm) => void,
  onEdit: (kit: Firearm) => void
}>()

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})

const columns: ColumnDef<Firearm>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => h(DragHandle),
  },
  {
    id: "select",
    header: ({ table }) => h(Checkbox, {
      "modelValue": table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate"),
      "onUpdate:modelValue": value => table.toggleAllPageRowsSelected(!!value),
      "aria-label": "Select all",
    }),
    cell: ({ row }) => h(Checkbox, {
      "modelValue": row.getIsSelected(),
      "onUpdate:modelValue": value => row.toggleSelected(!!value),
      "aria-label": "Select row",
    }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "serialNumber",
    header: "Serial Number",
    cell: ({ row }) => h("div", row.original.serialNumber),
    enableHiding: false,
  },
  {
    accessorKey: "make",
    header: "Make",
    cell: ({ row }) => h("div", row.original.make),
    enableHiding: true,
  },
  {
    accessorKey: "model",
    header: "Model",
    cell: ({ row }) => h("div", row.original.model),
    enableHiding: true,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => h("div", row.original.category),
    enableHiding: false,
  },
  {
    accessorKey: "caliber",
    header: "Caliber",
    cell: ({ row }) => h("div", row.original.caliber),
    enableHiding: false,
  },
  {
    accessorKey: "manufacturer",
    header: "Manufacturer",
    cell: ({ row }) => h("div", row.original.manufacturer),
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status
      const statusColor = statusToColor(status)

      return h(Badge, { variant: "outline", class: `flex items-center gap-2 ${statusColor}` }, () => status.toUpperCase())
    }
  },

  {
    id: "actions",
    cell: ({ row }) => h(DropdownMenu, {}, {
      default: () => [
        h(DropdownMenuTrigger, { asChild: true }, {
          default: () => h(Button, {
            variant: "ghost",
            class: "h-8 w-8 p-0",
          }, {
            default: () => [
              h("span", { class: "sr-only" }, "Open menu"),
              h(MoreVertical, { class: "h-4 w-4" }),
            ],
          }),
        }),
        h(DropdownMenuContent, { align: "end" }, {
          default: () => [
            h(DropdownMenuItem, { onClick: () => props.onView(row.original) }, () => "View"),
            h(DropdownMenuItem, { onClick: () => props.onEdit(row.original) }, () => "Edit"),
            h(DropdownMenuSeparator, {}),
            h(DropdownMenuItem, { onClick: () => props.onDelete(row.original), class: "text-red-600" }, () => "Delete"),
          ],
        }),
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
