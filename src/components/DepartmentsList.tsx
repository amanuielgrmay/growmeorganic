// @ts-nocheck
import React, { useState } from "react";
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Collapse,
} from "@mui/material";

interface Department {
  id: string;
  name: string;
  subDepartments: Department[];
}

const departmentData: Department[] = [
  {
    id: "1",
    name: "Engineering",
    subDepartments: [
      {
        id: "1.1",
        name: "Frontend",
        subDepartments: [],
      },
      {
        id: "1.2",
        name: "Backend",
        subDepartments: [],
      },
      {
        id: "1.3",
        name: "DevOps",
        subDepartments: [],
      },
    ],
  },
  {
    id: "2",
    name: "Marketing",
    subDepartments: [
      {
        id: "2.1",
        name: "SEO",
        subDepartments: [],
      },
      {
        id: "2.2",
        name: "Social Media",
        subDepartments: [],
      },
      {
        id: "2.3",
        name: "Content Writing",
        subDepartments: [],
      },
    ],
  },
  {
    id: "3",
    name: "Sales",
    subDepartments: [
      {
        id: "3.1",
        name: "B2B",
        subDepartments: [],
      },
      {
        id: "3.2",
        name: "B2C",
        subDepartments: [],
      },
    ],
  },
];

const DepartmentsList = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const [expanded, setExpanded] = useState<string[]>([]);

  const isSelected = (id) => selected.includes(id);

  const isExpanded = (id) => expanded.includes(id);

  const handleChange = (e) => {
    const { value, checked } = e.target;
    let newSelected;

    if (checked) {
      newSelected = [...selected, value];

      const department = departmentData.find((d) => d.id === value);
      if (department) {
        newSelected = [
          ...newSelected,
          ...department.subDepartments.map((sd) => sd.id),
        ];
      } else {
        const parentDepartment = departmentData.find((d) =>
          d.subDepartments.some((sd) => sd.id === value)
        );
        if (parentDepartment) {
          if (
            parentDepartment.subDepartments.every((sd) =>
              newSelected.includes(sd.id)
            )
          ) {
            newSelected = [...newSelected, parentDepartment.id];
          }
        }
      }
    } else {
      newSelected = selected.filter((s) => s !== value);

      const department = departmentData.find((d) => d.id === value);
      if (department) {
        newSelected = newSelected.filter(
          (s) => !department.subDepartments.map((sd) => sd.id).includes(s)
        );
      } else {
        const parentDepartment = departmentData.find((d) =>
          d.subDepartments.some((sd) => sd.id === value)
        );
        if (parentDepartment) {
          if (newSelected.includes(parentDepartment.id)) {
            newSelected = newSelected.filter((s) => s !== parentDepartment.id);
          }
        }
      }
    }

    setSelected(newSelected);
  };

  const handleToggle = (e) => {
    const { value } = e.target;
    let newExpanded;

    if (isExpanded(value)) {
      newExpanded = expanded.filter((e) => e !== value);
    } else {
      newExpanded = [...expanded, value];
    }

    setExpanded(newExpanded);
  };

  const renderCheckbox = (id, name, indented = false) => (
    <FormControlLabel
      key={id}
      control={
        <Checkbox
          checked={isSelected(id)}
          onChange={handleChange}
          value={id}
          color="primary"
        />
      }
      label={
        <>
          {name}
          {departmentData.some((d) => d.name === name) && (
            <span style={{ color: "gray" }}>
              {`(${
                departmentData.find((d) => d.name === name).subDepartments
                  .length
              })`}
            </span>
          )}
        </>
      }
      sx={{ marginLeft: indented ? "16px" : "0px" }}
    />
  );

  const renderDepartments = () =>
    departmentData.map((department) => [
      <Box key={department.id} sx={{ display: "flex", alignItems: "center" }}>
        {department.subDepartments.length > 0 && (
          <Checkbox
            checked={isExpanded(department.id)}
            onChange={handleToggle}
            value={department.id}
            icon={<Typography>+</Typography>}
            checkedIcon={<Typography>-</Typography>}
            sx={{ marginLeft: "-8px", marginRight: "-8px" }}
          />
        )}
        {renderCheckbox(department.id, department.name)}
      </Box>,
      <Collapse
        key={`${department.id}-collapse`}
        in={isExpanded(department.id)}
      >
        {department.subDepartments.map((subDepartment) => (
          <Box
            key={subDepartment.id}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            {renderCheckbox(subDepartment.id, subDepartment.name, true)}
          </Box>
        ))}
      </Collapse>,
    ]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", marginTop: "16px" }}>
      {renderDepartments()}
    </Box>
  );
};

export default DepartmentsList;
