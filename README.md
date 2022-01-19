# rezilion-ssp-addon

Rezilion SSP addon allows you to integrate Rezilion instrumentation into your K8s cluster.

# Instrumentation
The Rezilion instrumentation integrated with your K8s cluster by adding a daemon set to it that ensures every node
in your cluster includes a pod with our agent.

The agent scans the containers inside the pods on the node and collects required information for Rezilion Validate.

# Requirements
To use the addon you need to register with Rezilion at www.rezilion.com to get an API key for the Rezilion Validate 
service.