import React, { useState, useEffect } from "react";
import data from "../data.json";
import { useNavigate, useParams } from "react-router-dom";
import { DetailGrandPrix, TypeData, dataTable } from "../typeContain";
import { Card, Typography, Button } from "@material-tailwind/react";
import { BiArrowBack } from "react-icons/bi";

type Props = {};

const Detail: React.FC<Props> = () => {
  const { result } = data as TypeData;
  const { id } = useParams<string>();

  const [dataDetail, setDataDetail] = useState<DetailGrandPrix>();

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const filteredData = result.flatMap((item) =>
      item.dataTable.filter((value) => value.parentId === id)
    );
    setDataDetail(filteredData[0]);
  }, []);

  const TABLE_HEAD = [
    "POS",
    "NO",
    "DRIVER",
    "CAR",
    "LAPS",
    "TIME/RETIRED",
    "PTS",
  ];

  return dataDetail === undefined ? (
    <>Không có dữ liệu</>
  ) : (
    <>
      <Button
        color="gray"
        variant="outlined"
        className="flex items-center my-3 gap-3"
        onClick={handleGoBack}
      >
        <BiArrowBack />
        Back
      </Button>
      <Typography variant="h6" className={"pb-3"} color="blue-gray">
        {dataDetail?.title}
      </Typography>
      <div className="flex gap-3 text-xs mb-6">
        <p>
          <span>{dataDetail?.startDate + " - "}</span>
          <span>{dataDetail?.fullDate}</span>
        </p>
        <p className="text-gray-500">{dataDetail?.info}</p>
      </div>

      <Card className="overflow-x-scroll h-full w-full">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataDetail?.dataTable.map((item: dataTable, index: number) => {
              const isLast = index === dataDetail?.dataTable.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.POS}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.NO}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.DRIVER}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.CAR}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.LAPS}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.TIME}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.PTS}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default Detail;
