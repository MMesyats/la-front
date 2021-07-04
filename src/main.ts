import { createApp } from "vue";
import App from "@/App.vue";
import Table from "@/components/Table/Table.vue";
import Modal from "@/components/Modal/Modal.vue";
import Button from "@/components/Controls/Button.vue";
import Input from "@/components/Controls/Input.vue";
import Select from "@/components/Controls/Select.vue";
import DatePicker from "@/components/Controls/DatePicker.vue";

import router from "./router";

const app = createApp(App);

[Table, Modal, Button, Input, Select, DatePicker].forEach((c) => {
  app.component(c.name, c);
});

app.use(router).mount("#app");
