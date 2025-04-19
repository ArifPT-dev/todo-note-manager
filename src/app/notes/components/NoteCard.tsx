import TooltipText from '@/components/TooltipText';
type NoteCardProps = {
  id: number;
  content: string;
  onDelete: (id: number) => void;
  onUpdate: (id: number, content: string) => void;
};

export default function NoteCard({ id, content, onDelete, onUpdate }: NoteCardProps) {
  return (
    <div className="flex justify-between items-start bg-gray-50 p-4 rounded-xl shadow-sm">
      {/* แสดงข้อความด้วย Tooltip */}
      <TooltipText text={content} />

        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 ml-0 sm:ml-4 shrink-0 text-right sm:text-left">
          <button
            onClick={() => onUpdate(id, content)}
            className="text-sm text-blue-600 hover:underline"
          >
            แก้ไข
          </button>
          <button
            onClick={() => onDelete(id)}
            className="text-sm text-red-500 hover:underline"
          >
            ลบ
          </button>
        </div>
    </div>
  );
}
