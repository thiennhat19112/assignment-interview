import React, { useState, useEffect, SyntheticEvent, useMemo } from "react";

import { Autocomplete, TextField } from "@mui/material";
import data from "../data.json";
import { Card, Typography } from "@material-tailwind/react";
import { AllLocation, TypeData, result, year } from "../typeContain";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import LineComponent from "../components/Line";

interface Props {}

const MainBoard: React.FC<Props> = () => {
  const { years, result } = data as TypeData;
  const [dataTableAll, setDataTableAll] = useState<AllLocation[]>(
    result[0].allLocation
  );
  const navigate = useNavigate();
  const { state, setState } = useStateContext();
  const handleChangeOption = (
    event: SyntheticEvent<Element, Event>,
    value: year | null
  ) => {
    if (value !== null) {
      setState(value);
    }
  };

  const onRedirect = (id: string) => {
    navigate(`/detail/${id}`);
  };

  useEffect(() => {
    let isMounted: boolean = true;

    const newResult: result | undefined = [...result].find(
      (item) => item.year === state.year
    );

    isMounted && setDataTableAll(newResult!.allLocation);

    return () => {
      isMounted = false;
    };
  }, [JSON.stringify(state.year)]);

  const TABLE_HEAD = ["GRAND PRIX", "DATE", "WINNER", "CAR", "LAPS", "TIME"];

  const DATA_GRAPHIC: any = useMemo(() => {
    const winners: string[] = dataTableAll.map((item) => item.WINNER);

    const labels: string[] = winners.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    const dataBar: number[] = Object.values(
      winners.reduce(
        (accumulator: { [key: string]: number }, currentValue: string) => {
          accumulator[currentValue] = (accumulator[currentValue] || 0) + 1;
          return accumulator;
        },
        {}
      )
    );
    return {
      labels,
      datasets: [
        {
          label: "Winners",
          data: dataBar,
          backgroundColor: "#03a9f4",
          barThickness: 100, // Đặt width cột là 20
          maxBarThickness: 100, // Đặt width tối đa của cột là 30
        },
      ],
    };
  }, [dataTableAll]);

  const dataTabs = [
    {
      label: "Table",
      value: "table",
      component: (
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
              {dataTableAll.map(
                (
                  {
                    id,
                    GRAND_PRIX,
                    DATE,
                    WINNER,
                    CAR,
                    LAPS,
                    TIME,
                  }: AllLocation,
                  index: number
                ) => {
                  const isLast = index === dataTableAll.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={id}>
                      <td className={classes}>
                        <Typography
                          onClick={() => onRedirect(id)}
                          variant="small"
                          color="blue "
                          className="font-normal text-blue-400 underline underline-offset-4 cursor-pointer"
                        >
                          {GRAND_PRIX}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {DATE}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {WINNER}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {CAR}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {LAPS}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {TIME}
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </Card>
      ),
    },
    {
      label: "Graphic",
      value: "graphic",
      component: <LineComponent data={DATA_GRAPHIC} />,
    },
  ];

  return (
    <>
      <div className="flex justify-end">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={years}
          getOptionLabel={(option) => option.year}
          sx={{ width: 200 }}
          size="small"
          onChange={handleChangeOption}
          value={state}
          className="my-3"
          color="white"
          renderInput={(params) => <TextField {...params} label="Year" />}
        />
      </div>
      <Typography variant="h3" className={"pb-3"}>
        Bảng dữ liệu Races results năm {state.year}
      </Typography>
      <Tabs value="table">
        <TabsHeader className="w-1/2">
          {dataTabs.map(({ label, value }) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {dataTabs.map(({ value, component }) => (
            <TabPanel key={value} value={value}>
              {component}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </>
  );
};

export default MainBoard;
