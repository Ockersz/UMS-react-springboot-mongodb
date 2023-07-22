import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListIcon from "@mui/icons-material/List";
import CreateIcon from "@mui/icons-material/Create";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";

export default function TemporaryDrawer({ state, setState, toggleDrawer }) {
  const navigate = useNavigate();

  const navigateTab = (index) => {
    if (index === 0) {
      navigate("/laptoplist");
    } else if (index === 1) {
      navigate("/addlaptop");
    } else if (index === 2) {
      navigate("/returnlaptop");
    } else if (index === 3) {
      navigate("/allocatelaptop");
    } else {
      navigate("/about");
    }
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          "Laptop List",
          "Add Laptop",
          "Return Laptop",
          "Allocate Laptop",
          "About Us",
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => navigateTab(index)}>
              <ListItemIcon>
                {(() => {
                  switch (index % 5) {
                    case 0:
                      return <ListIcon color="primary" />;
                    case 1:
                      return <CreateIcon color="primary" />;
                    case 2:
                      return <AssignmentReturnIcon color="primary" />;
                    case 3:
                      return <AssignmentIcon color="primary" />;
                    case 4:
                      return <InfoIcon color="primary" />;
                    default:
                      return null;
                  }
                })()}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
