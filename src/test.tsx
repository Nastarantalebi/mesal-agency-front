
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="">
          <Calendar
            value={selectedMonth}
            onChange={handleMonthChange}
            onlyMonthPicker
            calendar={persian}
            locale={persian_fa}
          />
          <div className="mt-10">
            {selectedMonth && (
              <>
                <div className="flex gap-4">
                  <div className="flex flex-col gap-1">
                    <Label>قیمت نرمال</Label>
                    <Input
                      type="number"
                      value={globalNormalPrice}
                      onChange={(e) => setGlobalNormalPrice(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label>قیمت پیک</Label>
                    <Input
                      type="number"
                      value={globalPeakPrice}
                      onChange={(e) => setGlobalPeakPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex mt-5 mb-10">
                  <CustomButton onClick={handleApplyAll}>
                    اعمال روی همه روز ها
                  </CustomButton>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>روز</TableHead>
                      <TableHead>تاریخ</TableHead>
                      <TableHead>قیمت نرمال</TableHead>
                      <TableHead>قیمت پیک</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getDaysInMonth().map((item) => (
                      <TableRow key={item.day}>
                        <TableCell>{item.day}</TableCell>
                        <TableCell>{item.shamsi}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            placeholder="0"
                            value={rowPrices[item.day]?.normalPrice ?? ""}
                            onChange={(e) =>
                              handleRowChange(item.day, "normalPrice", e.target.value)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            placeholder="0"
                            value={rowPrices[item.day]?.peakPrice ?? ""}
                            onChange={(e) =>
                              handleRowChange(item.day, "peakPrice", e.target.value)
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
Key points: