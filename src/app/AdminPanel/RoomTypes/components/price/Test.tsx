import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Controller, useForm } from "react-hook-form";
import type { TCRoomTypePrices } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  roomTypePriceInitialValues,
  roomTypePriceValidation,
} from "../../fixtures/Validation";
import { Input } from "@/components/ui/input";
const Test = () => {
  const days = [
    " ",
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنجشنبه",
    "جمعه",
  ];

  const formData = [
    "قیمت نرمال بزرگسال",
    "قیمت پیک بزرگسال",
    "قیمت نرمال کودک",
    "قیمت پیک کودک",
  ];
  const form = useForm<TCRoomTypePrices>({
    resolver: zodResolver(roomTypePriceValidation),
    defaultValues: roomTypePriceInitialValues,
  });

  // ایجاد یک آرایه با ۵ المان برای ردیف‌ها
  const rows = Array.from({ length: 5 });

  return (
    <div className="w-full overflow-hidden rounded-lg border border-border">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="hover:bg-transparent">
            {days.map((day) => (
              <TableHead
                key={day}
                className="h-12 border-l border-border text-center font-bold last:border-l-0"
              >
                {day}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((_, rowIndex) => (
            <TableRow key={rowIndex} className="hover:bg-transparent">
              {days.map((item, colIndex) => (
                <TableCell
                  key={colIndex}
                  className=" border-l border-b border-border last:border-l-0"
                  style={{ width: "120px", minWidth: "120px" }} 
                >
                  {rowIndex === 0 &&
                    colIndex === 0 &&
                    formData.map((item, i) => (
                      <div key={i} className=" my-1 p-1">
                        {item}
                      </div>
                    ))}

                  {colIndex !== 0 && (
                    <div className="flex flex-col gap-1">
                      <Controller
                        name={`prices.${colIndex}.normal_price`}
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <>
                            <Input
                              {...field}
                              type="number"
                              dir="ltr"
                              onChange={(e) => {
                                field.onChange(e.target.valueAsNumber);
                              }}
                              className={`text-left ${fieldState.error ? "border-red-600" : ""} `}
                            />
                          </>
                        )}
                      />
                      <Controller
                        name={`prices.${colIndex}.peak_price`}
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <>
                            <Input
                              {...field}
                              type="number"
                              dir="ltr"
                              onChange={(e) => {
                                field.onChange(e.target.valueAsNumber);
                              }}
                              className={`text-left ${fieldState.error ? "border-red-600" : ""} `}
                            />
                          </>
                        )}
                      />
                      <Controller
                        name={`prices.${colIndex}.normal_child_price`}
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <>
                            <Input
                              {...field}
                              type="number"
                              dir="ltr"
                              onChange={(e) => {
                                field.onChange(e.target.valueAsNumber);
                              }}
                              className={`text-left ${fieldState.error ? "border-red-600" : ""} `}
                            />
                          </>
                        )}
                      />
                      <Controller
                        name={`prices.${colIndex}.peak_child_price`}
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <>
                            <Input
                              {...field}
                              type="number"
                              dir="ltr"
                              onChange={(e) => {
                                field.onChange(e.target.valueAsNumber);
                              }}
                              className={`text-left ${fieldState.error ? "border-red-600" : ""} `}
                            />
                          </>
                        )}
                      />
                    </div>
                  )}

                  <span className="text-xs text-muted-foreground"></span>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Test;
