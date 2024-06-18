export interface TableData {
    resData: {
      data: Array<{
        is_table_exist: unknown;
        table_id: { value: number; is_edit: boolean; type: string };
        table_type: { value: string; is_edit: boolean; type: string };
        table_name: { value: string; is_edit: boolean; type: string };
        description: { value: string; is_edit: boolean; type: string };
        attribute_count: { value: number; is_edit: boolean; type: string };
        rows_count: { value: number; is_edit: boolean; type: string };
        created_on: { value: Date; is_edit: boolean; type: string };
        created_by: { value: string; is_edit: boolean; type: string };
        updated_on: { value: string; is_edit: boolean; type: string };
        updated_by: { value: string; is_edit: boolean; type: string };
        is_standard: { value: boolean; is_edit: boolean; type: string };
        is_active: { value: boolean; is_edit: boolean; type: string };
        property: { is_edit: boolean; is_delete: boolean };
        related_table: Array<{ id: number; name: string }>;
      }>;
      total_record: number;
    };
    status: boolean;
    message: string;
  }
  