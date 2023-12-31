<template>
  <q-page>
    <div class="WAL position-relative bg-grey-4" :style="style">
      <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" container>
        <q-header>
          <q-toolbar class="bg-grey-3 text-black">
            <q-btn
              round
              flat
              icon="keyboard_arrow_left"
              class="WAL__drawer-open q-mr-sm"
              @click="toggleLeftDrawer"
            />
            <q-btn round flat>
              <q-avatar>
                <img
                  v-if="currentConversation.receveur === user.iduser"
                  :src="currentConversation.photoEnvoyeur"
                />
                <img
                  v-if="currentConversation.envoyeur === user.iduser"
                  :src="currentConversation.photoReceveur"
                />
              </q-avatar>
            </q-btn>

            <span
              v-if="currentConversation.receveur === user.iduser"
              class="q-subtitle-1 q-pl-md"
            >
              {{ currentConversation.nomEnvoyeur }}
            </span>
            <span
              v-if="currentConversation.envoyeur === user.iduser"
              class="q-subtitle-1 q-pl-md"
            >
              {{ currentConversation.nomReceveur }}
            </span>

            <q-space />
          </q-toolbar>
        </q-header>

        <q-drawer
          v-model="leftDrawerOpen"
          show-if-above
          bordered
          :breakpoint="690"
        >
          <q-toolbar class="bg-grey-3">
            <q-toolbar-title
              ><q-btn round flat icon="message" /> Message</q-toolbar-title
            >

            <q-btn
              round
              flat
              icon="close"
              class="WAL__drawer-close"
              @click="toggleLeftDrawer"
            />
          </q-toolbar>

          <q-scroll-area style="height: calc(100% - 100px)">
            <q-list>
              <q-item
                v-for="(conversation, index) in listMP"
                :key="conversation.idmessage"
                clickable
                v-ripple
                @click="setCurrentConversation(index)"
              >
                <q-item-section avatar>
                  <q-avatar>
                    <img
                      v-if="conversation.receveur === user.iduser"
                      :src="conversation.photoEnvoyeur"
                    />
                    <img
                      v-if="conversation.envoyeur === user.iduser"
                      :src="conversation.photoReceveur"
                    />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">
                    <div v-if="conversation.receveur === user.iduser">
                      {{ conversation.nomEnvoyeur }}
                    </div>
                    <div v-if="conversation.envoyeur === user.iduser">
                      {{ conversation.nomReceveur }}
                    </div>
                  </q-item-label>
                  <q-item-label class="conversation__summary" caption>
                    <!-- <q-icon name="check" v-if="conversation.sent" />
                    <q-icon name="not_interested" v-if="conversation.deleted" /> -->
                    {{ conversation.msg }}
                  </q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label caption>
                    {{ conversation.time }}
                  </q-item-label>
                  <q-icon name="keyboard_arrow_down" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </q-drawer>

        <q-page-container class="bg-grey-2">
          <div class="q-pa-md row justify-center">
            <div style="width: 70%">
              <div v-for="item in messages" :key="item.idmessage">
                <q-chat-message
                  v-if="item.envoyeur === user.iduser"
                  :name="item.nomenvoyeur"
                  :avatar="item.photoProfil"
                  :text="[item.msg]"
                  sent
                  text-color="white"
                  bg-color="primary"
                />
                <q-chat-message
                  v-else
                  :name="item.nomenvoyeur"
                  :avatar="item.photoProfil"
                  :text="[item.msg]"
                  bg-color="grey-4"
                />
              </div>
              <div v-show="currentConversation == 0" class="text-h5 bold">
                Pas encore de message.
              </div>
            </div>
          </div>
        </q-page-container>
        <q-footer>
          <q-toolbar class="bg-grey-3 text-black row">
            <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
            <q-input
              rounded
              outlined
              dense
              class="WAL__field col-grow q-mr-sm"
              bg-color="white"
              v-model="formData.message"
              placeholder="Type a message"
            />
            <q-btn round flat icon="send" @click="sendMessage" />
          </q-toolbar>
        </q-footer>
      </q-layout>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { ref, computed } from "vue";
import axios from "axios";

const conversations = [
  {
    id: 1,
    person: "Razvan Stoenescu",
    avatar: "https://cdn.quasar.dev/team/razvan_stoenescu.jpeg",
    caption: "I'm working on Quasar!",
    time: "15:00",
    sent: true,
  },
  {
    id: 2,
    person: "Dan Popescu",
    avatar: "https://cdn.quasar.dev/team/dan_popescu.jpg",
    caption: "I'm working on Quasar!",
    time: "16:00",
    sent: true,
  },
  {
    id: 3,
    person: "Jeff Galbraith",
    avatar: "https://cdn.quasar.dev/team/jeff_galbraith.jpg",
    caption: "I'm working on Quasar!",
    time: "18:00",
    sent: true,
  },
  {
    id: 4,
    person: "Allan Gaunt",
    avatar: "https://cdn.quasar.dev/team/allan_gaunt.png",
    caption: "I'm working on Quasar!",
    time: "17:00",
    sent: true,
  },
];

export default {
  name: "WhatsappLayout",

  setup() {
    const $q = useQuasar();
    const user = ref("");
    const listMP = ref("");

    const leftDrawerOpen = ref(false);
    const message = ref("");
    const messages = ref("");
    const currentConversationIndex = ref(0);

    const currentConversation = ref("");

    const style = computed(() => ({
      height: $q.screen.height + "px",
    }));

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    function setCurrentConversation(index) {
      currentConversation.value = listMP.value[index];
      if (currentConversation.value.receveur === user.value.iduser) {
        fetchMessages(user.value.iduser, currentConversation.value.envoyeur);
        formData.value.idreceveur = currentConversation.value.envoyeur;
      } else {
        fetchMessages(user.value.iduser, currentConversation.value.receveur);
        formData.value.idreceveur = currentConversation.value.receveur;
      }
    }

    const fetchConversations = async (id) => {
      try {
        console.log(id);
        const response = await axios.get(
          "https://libere-toi.onrender.com/message/ListeMP/" + id
        );
        console.log(response.data);
        listMP.value = response.data;
        currentConversation.value = listMP.value[0];

        if (listMP.value[0].receveur === id) {
          formData.value.idreceveur = currentConversation.value.envoyeur;
          fetchMessages(id, response.data[0].envoyeur);
        } else {
          formData.value.idreceveur = currentConversation.value.receveur;
          fetchMessages(id, response.data[0].receveur);
        }
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    const fetchMessages = async (idenvoyeur, idreceveur) => {
      try {
        console.log(idenvoyeur, idreceveur);
        const response = await axios.get(
          "https://libere-toi.onrender.com/message/" +
            idenvoyeur +
            "/" +
            idreceveur
        );
        console.log(response.data);
        messages.value = response.data;
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    const getUserInfo = () => {
      const users = $q.localStorage.getItem("user-info");
      if (users != null) {
        console.log(users.data[0]);

        fetchConversations(users.data[0].iduser);

        formData.value.idenvoyeur = users.data[0].iduser;

        user.value = users.data[0];
      } else {
        router.push("/Outer/Login");
      }
    };

    const formData = ref({
      idenvoyeur: "",
      idreceveur: "",
      message: "",
    });

    const sendMessage = async () => {
      try {
        console.log("begin");
        console.log(formData.value);
        const response = await axios.post(
          "https://libere-toi.onrender.com/message/",
          formData.value
        );
        console.log("Réponse du serveur :", response);
        getUserInfo();
        formData.value.message = "";
      } catch (error) {
        console.log(error);
      }
    };

    return {
      leftDrawerOpen,
      message,
      messages,
      currentConversationIndex,
      conversations,
      user,
      listMP,
      sendMessage,
      formData,

      currentConversation,
      setCurrentConversation,
      style,

      toggleLeftDrawer,

      fetchConversations,
      getUserInfo,
      fetchMessages,
    };
  },

  created() {
    this.getUserInfo();
  },
};
</script>
