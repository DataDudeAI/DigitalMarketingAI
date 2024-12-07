import streamlit as st
import requests
from typing import Literal

ActionType = Literal["research_audience", "create_content", "analyze_market", "email_campaign"]

class MarketingAI:
    def __init__(self):
        self.base_url = "http://localhost:5000"
    
    def send_request(self, action: ActionType, product: str) -> dict:
        try:
            response = requests.post(
                f"{self.base_url}/{action}",
                json={"product": product}
            )
            return response.json()
        except Exception as e:
            return {"status": "error", "message": str(e)}

def main():
    st.set_page_config(
        page_title="Digital Marketing AI Platform",
        page_icon="🚀",
        layout="wide"
    )

    st.title("Digital Marketing AI Platform")
    st.write("Enter your product or service to get AI-powered marketing insights")

    # Initialize MarketingAI
    marketing_ai = MarketingAI()

    # Product input
    product = st.text_input(
        "Enter Your Product or Service",
        placeholder="e.g., Wireless Headphones, Online Course, etc."
    )

    # Create columns for buttons
    col1, col2 = st.columns(2)
    col3, col4 = st.columns(2)

    if product:
        with col1:
            if st.button("🔍 Research Audience", use_container_width=True):
                with st.spinner("Researching audience..."):
                    response = marketing_ai.send_request("research_audience", product)
                    st.write("### Audience Research Results")
                    st.write(response["message"])

        with col2:
            if st.button("✍️ Generate Content", use_container_width=True):
                with st.spinner("Generating content..."):
                    response = marketing_ai.send_request("create_content", product)
                    st.write("### Generated Content")
                    st.write(response["message"])

        with col3:
            if st.button("📊 Market Analysis", use_container_width=True):
                with st.spinner("Analyzing market..."):
                    response = marketing_ai.send_request("analyze_market", product)
                    st.write("### Market Analysis")
                    st.write(response["message"])

        with col4:
            if st.button("📧 Email Campaign", use_container_width=True):
                with st.spinner("Creating email campaign..."):
                    response = marketing_ai.send_request("email_campaign", product)
                    st.write("### Email Campaign")
                    st.write(response["message"])
    else:
        st.info("Please enter a product or service to get started")

    # Footer
    st.markdown("---")
    st.markdown(
        """
        <div style='text-align: center'>
            <p>Powered by OpenAI GPT-3.5 | Built with Streamlit and Flask</p>
        </div>
        """,
        unsafe_allow_html=True
    )

if __name__ == "__main__":
    main()